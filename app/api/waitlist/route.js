import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    // Notify founders
    // from: use custom domain once thefourthplace.me is verified in Resend → Domains
    // until then, onboarding@resend.dev works for any verified Resend account
    await resend.emails.send({
      from: 'permanentresident@thefourthplace.me>',
      to: 'founders@thefourthplace.me',
      subject: 'New permanent resident',
      text: `New permanent resident: ${email}`,
      html: `
        <div style="font-family:monospace;padding:32px;background:#0a0a0f;color:#fff;max-width:480px">
          <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 24px">
            The Fourth Place — Permanent Residency Request
          </p>
          <p style="font-size:22px;margin:0 0 8px;font-weight:400">${email}</p>
          <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0">
            Requested to move in at ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    // Add to Resend audience if AUDIENCE_ID is configured
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
