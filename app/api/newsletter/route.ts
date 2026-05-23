import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Notify the team
    await resend.emails.send({
      from: "SKTR <signal@thesktr.com>",
      to: "signal@thesktr.com",
      subject: "New newsletter signup",
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    });

    // Confirm to the subscriber
    await resend.emails.send({
      from: "SKTR <signal@thesktr.com>",
      to: email,
      subject: "You're on the list.",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem;background:#050608;color:#e8ebf0;">
          <p style="font-size:1.5rem;font-weight:800;margin:0 0 1rem;">You're on the list.</p>
          <p style="color:rgba(232,235,240,0.7);line-height:1.7;margin:0 0 1.5rem;">
            Thanks for signing up. You'll hear from us when there's something worth sharing —
            platform launches, ecosystem updates, and perspectives from inside SKTR.
          </p>
          <p style="color:rgba(232,235,240,0.4);font-size:0.85rem;">
            SKTR · Innovation Group · <a href="https://sktr.live" style="color:#3e69ff;">sktr.live</a>
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
