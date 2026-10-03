import { Resend } from "resend";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Makes typed text safe to place inside an email's HTML */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * At most 5 enquiries per visitor address every 10 minutes. The count is kept in memory, so it
 * resets when the server restarts and is per server instance: it slows abuse, it does not stop
 * a determined sender.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, service, stage, budget, description, website, startedAt } = await req.json();

    // Spam traps: a hidden field people never see, and a form sent faster than a person can type.
    // Both answer "success" so a bot learns nothing.
    const tooFast = typeof startedAt === "number" && Date.now() - startedAt < 3000;
    if ((typeof website === "string" && website.trim() !== "") || tooFast) {
      return NextResponse.json({ success: true });
    }

    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    if (tooMany(ip)) {
      return NextResponse.json(
        { error: "Too many messages in a short time. Please try again in a few minutes, or email signal@thesktr.com." },
        { status: 429 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json({ error: "Please describe your project." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 200 || description.length > 5000) {
      return NextResponse.json({ error: "That message is too long. Please shorten it." }, { status: 400 });
    }

    const safeName = esc(name.trim());
    const safeEmail = esc(email.trim());
    const safeDescription = esc(description.trim()).replace(/\n/g, "<br>");

    const pick = (v: unknown) => (typeof v === "string" && v ? esc(v.slice(0, 80)) : "Not specified");
    const serviceLabel = pick(service);
    const stageLabel = pick(stage);
    const budgetLabel = pick(budget);

    // Notify team
    const notice = await resend.emails.send({
      from: "SKTR Labs Contact <signal@thesktr.com>",
      to: "signal@thesktr.com",
      replyTo: email.trim(),
      subject: `Project inquiry: ${typeof service === "string" && service ? service.slice(0, 80) : "Not specified"}, ${name.trim().replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.1rem;font-weight:700;margin:0 0 1.5rem;">New project inquiry</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;width:130px;vertical-align:top;">Name</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Email</td>
              <td style="padding:0.6rem 0;"><a href="mailto:${safeEmail}" style="color:#3e69ff;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Building</td>
              <td style="padding:0.6rem 0;color:#3e69ff;font-weight:600;">${serviceLabel}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Stage</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${stageLabel}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Budget</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${budgetLabel}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Description</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;line-height:1.7;">${safeDescription}</td>
            </tr>
          </table>
          <p style="color:rgba(232,235,240,0.4);font-size:0.8rem;">Reply directly to this email to respond to ${safeName}.</p>
        </div>
      `,
    });

    // The email service reports failures in its reply instead of throwing. Without this check the
    // visitor was told "sent" while the enquiry was lost.
    if (notice.error) {
      console.error("[contact] Enquiry email failed:", notice.error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please email signal@thesktr.com directly." },
        { status: 502 }
      );
    }

    // Auto-reply to submitter
    await resend.emails.send({
      from: "SKTR Labs <signal@thesktr.com>",
      to: email.trim(),
      subject: "We got it.",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2.5rem 2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.6rem;font-weight:800;letter-spacing:-0.04em;margin:0 0 1.5rem;line-height:1;">We got it.</p>
          <p style="color:rgba(232,235,240,0.68);line-height:1.75;margin:0 0 1rem;font-size:0.95rem;">
            Hi ${safeName},
          </p>
          <p style="color:rgba(232,235,240,0.68);line-height:1.75;margin:0 0 2rem;font-size:0.95rem;">
            Thanks for reaching out. We respond within 48 hours.
            If it&apos;s urgent, reply directly to this email.
          </p>
          <p style="color:rgba(232,235,240,0.32);font-size:0.8rem;border-top:1px solid rgba(131,145,190,0.15);padding-top:1.5rem;margin:0;">
            SKTR Labs &middot; Software Studio &middot; <a href="https://thesktr.com" style="color:#3e69ff;">thesktr.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
