import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { thought, email } = await request.json();

  if (!thought || !thought.trim()) {
    return NextResponse.json({ error: 'Thought is required' }, { status: 400 });
  }

  try {
    // Notify founders
    await resend.emails.send({
      from: 'permanentresident@thefourthplace.me',
      to: 'founders@thefourthplace.me',
      subject: 'New feature idea',
      html: `
        <div style="font-family:monospace;padding:32px;background:#0a0a0f;color:#fff;max-width:520px">
          <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 24px">
            The Fourth Place — Feature Idea
          </p>
          <p style="font-size:16px;line-height:1.7;color:rgba(255,255,255,0.85);margin:0 0 24px;white-space:pre-wrap">${thought.trim()}</p>
          ${email ? `<p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0">From: ${email}</p>` : ''}
          <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:8px 0 0">
            ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    // Send acknowledgement to the user if they left their email
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await resend.emails.send({
        from: 'permanentresident@thefourthplace.me',
        to: email,
        subject: 'We got your idea — The Fourth Place',
        html: `
          <div style="font-family:monospace;padding:32px;background:#0a0a0f;color:#fff;max-width:520px">
            <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 32px">
              The Fourth Place
            </p>
            <p style="font-size:22px;font-weight:400;margin:0 0 12px">We got it.</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0 0 32px">
              Every thought shapes what comes next. The founders read every submission personally — yours is in.
            </p>
            <div style="border-left:1px solid rgba(255,255,255,0.15);padding-left:16px;margin-bottom:32px">
              <p style="font-size:13px;color:rgba(255,255,255,0.35);line-height:1.7;margin:0;white-space:pre-wrap">${thought.trim()}</p>
            </div>
            <p style="font-size:11px;color:rgba(255,255,255,0.2);margin:0">
              founders@thefourthplace.me
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
