import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { name, email, role } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const roleLabel = role === "coach" ? "Coach (team)" : "Athlete (individual)";

    await resend.emails.send({
      from: "SKTR Coach <signal@thesktr.com>",
      to: "signal@thesktr.com",
      replyTo: email,
      subject: `SKTR Coach Early Access — ${roleLabel}: ${name.trim()}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.1rem;font-weight:700;margin:0 0 1.5rem;">SKTR Coach — Early Access Request</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;width:130px;">Name</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;">Email</td>
              <td style="padding:0.6rem 0;"><a href="mailto:${email}" style="color:#3e69ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;">Role</td>
              <td style="padding:0.6rem 0;color:#3e69ff;font-weight:600;">${roleLabel}</td>
            </tr>
          </table>
        </div>
      `,
    });

    await resend.emails.send({
      from: "SKTR Coach <signal@thesktr.com>",
      to: email,
      subject: "You're on the SKTR Coach early access list.",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2.5rem 2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.6rem;font-weight:800;letter-spacing:-0.04em;margin:0 0 1.5rem;line-height:1;">You&apos;re in.</p>
          <p style="color:rgba(232,235,240,0.68);line-height:1.75;margin:0 0 1rem;font-size:0.95rem;">Hi ${name.trim()},</p>
          <p style="color:rgba(232,235,240,0.68);line-height:1.75;margin:0 0 2rem;font-size:0.95rem;">
            ${role === "coach"
              ? "You&apos;re on the early access list for the SKTR Coach web platform. We&apos;ll reach out directly when we&apos;re ready to onboard your team."
              : "You&apos;re on the early access list. We&apos;ll notify you the moment SKTR Coach is available on the App Store and Google Play."
            }
          </p>
          <p style="color:rgba(232,235,240,0.32);font-size:0.8rem;border-top:1px solid rgba(131,145,190,0.15);padding-top:1.5rem;margin:0;">
            SKTR Coach &middot; Built by SKTR Labs &middot; <a href="https://thesktr.com" style="color:#3e69ff;">thesktr.com</a>
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
