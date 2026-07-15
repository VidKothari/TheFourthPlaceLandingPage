import { NextResponse } from 'next/server';
import {
  createMailTransport,
  getMailConfig,
  sendSubmissionEmail,
} from '../../../lib/landing-email.mjs';

export const runtime = 'nodejs';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = body?.email;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const config = getMailConfig();
    const transport = createMailTransport(config);
    await sendSubmissionEmail(transport, {
      kind: 'waitlist',
      email,
      position: null,
      contactEmail: config.contactEmail,
      sender: config.sender,
    });

    return NextResponse.json({ success: true, position: null });
  } catch (error) {
    console.error('Gmail SMTP waitlist delivery failed:', error);
    return NextResponse.json({ error: 'Failed to deliver signup' }, { status: 500 });
  }
}
