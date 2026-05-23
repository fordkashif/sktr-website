import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const intentLabels: Record<string, string> = {
  athlete: "Athlete or team",
  brand: "Brand or collaborator",
  investor: "Investor or capital partner",
  other: "Something else",
};

export async function POST(req: Request) {
  try {
    const { name, email, message, intent, context } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    const intentLabel =
      typeof intent === "string" ? (intentLabels[intent] ?? intent) : "Not specified";

    // Notify team
    await resend.emails.send({
      from: "SKTR Contact <signal@thesktr.com>",
      to: "signal@thesktr.com",
      replyTo: email,
      subject: `${intentLabel} — ${name.trim()}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.1rem;font-weight:700;margin:0 0 1.5rem;">New contact submission</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;width:130px;vertical-align:top;">Name</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Email</td>
              <td style="padding:0.6rem 0;"><a href="mailto:${email}" style="color:#3e69ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Intent</td>
              <td style="padding:0.6rem 0;color:#3e69ff;font-weight:600;">${intentLabel}</td>
            </tr>
            ${context ? `<tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Context</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${context}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Message</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;line-height:1.7;">${message.trim().replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="color:rgba(232,235,240,0.4);font-size:0.8rem;">Reply directly to this email to respond to ${name.trim()}.</p>
        </div>
      `,
    });

    // Auto-reply to submitter
    await resend.emails.send({
      from: "SKTR <signal@thesktr.com>",
      to: email,
      subject: "We got it.",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2.5rem 2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.6rem;font-weight:800;letter-spacing:-0.04em;margin:0 0 1.5rem;line-height:1;">We got it.</p>
          <p style="color:rgba(232,235,240,0.68);line-height:1.75;margin:0 0 1rem;font-size:0.95rem;">
            Hi ${name.trim()},
          </p>
          <p style="color:rgba(232,235,240,0.68);line-height:1.75;margin:0 0 2rem;font-size:0.95rem;">
            Thanks for reaching out. We respond within 48 hours to conversations that fit the SKTR direction.
            If it&apos;s urgent, reply directly to this email.
          </p>
          <p style="color:rgba(232,235,240,0.32);font-size:0.8rem;border-top:1px solid rgba(131,145,190,0.15);padding-top:1.5rem;margin:0;">
            SKTR &middot; Innovation Group &middot; <a href="https://thesktr.com" style="color:#3e69ff;">thesktr.com</a>
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
