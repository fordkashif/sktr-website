import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { name, company, email, message } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    await resend.emails.send({
      from: "SKTR Contact <signal@thesktr.com>",
      to: "signal@thesktr.com",
      replyTo: email,
      subject: `New message from ${name.trim()}${company ? ` · ${company.trim()}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.1rem;font-weight:700;margin:0 0 1.5rem;color:#e8ebf0;">New contact form submission</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;width:120px;vertical-align:top;">Name</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${name.trim()}</td>
            </tr>
            ${company ? `<tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Company</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;">${company.trim()}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Email</td>
              <td style="padding:0.6rem 0;"><a href="mailto:${email}" style="color:#3e69ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:0.6rem 0;color:rgba(232,235,240,0.52);font-size:0.82rem;vertical-align:top;">Message</td>
              <td style="padding:0.6rem 0;color:#e8ebf0;line-height:1.7;">${message.trim().replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          <p style="color:rgba(232,235,240,0.4);font-size:0.8rem;">Reply directly to this email to respond to ${name.trim()}.</p>
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
