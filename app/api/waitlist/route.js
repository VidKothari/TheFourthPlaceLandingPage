import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = body?.email;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set — waitlist signup dropped:', email);
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  let stored = false;
  let position = null;

  // Store in the Resend audience first — this is the record that matters.
  if (audienceId) {
    const { error: contactError } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
    // A duplicate contact means they're already on the list — that's a success.
    if (!contactError || /exist/i.test(contactError.message || '')) {
      stored = true;
    } else {
      console.error('Resend contact error:', contactError);
    }

    if (stored) {
      const { data: list, error: listError } = await resend.contacts.list({ audienceId });
      if (listError) {
        console.error('Resend list error:', listError);
      } else {
        const contacts = list?.data;
        if (Array.isArray(contacts) && contacts.length > 0) position = contacts.length;
      }
    }
  }

  // Notify founders. The Resend SDK returns { error } rather than throwing.
  const { error: sendError } = await resend.emails.send({
    from: 'The Fourth Place <founders@thefourthplace.me>',
    to: 'permanentresident@thefourthplace.me',
    subject: 'New waitlist signup',
    text: `New waitlist signup: ${email}${position ? ` (No. ${position})` : ''}`,
    html: `
      <div style="font-family:monospace;padding:32px;background:#0a0a09;color:#fff;max-width:480px">
        <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 24px">
          The Fourth Place — Waitlist
        </p>
        <p style="font-size:22px;margin:0 0 8px;font-weight:400">${email}</p>
        <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0">
          ${position ? `No. ${position} · ` : ''}Joined at ${new Date().toUTCString()}
        </p>
      </div>
    `,
  });
  if (sendError) console.error('Resend send error:', sendError);

  // Fail only if the signup was recorded nowhere at all.
  if (!stored && sendError) {
    return NextResponse.json({ error: 'Failed to record signup' }, { status: 500 });
  }

  return NextResponse.json({ success: true, position });
}
