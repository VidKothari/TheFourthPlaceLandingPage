import { NextResponse } from 'next/server';
import {
  createMailTransport,
  getMailConfig,
  sendSubmissionEmail,
  suggestionAcknowledgementEmail,
} from '../../../lib/landing-email.mjs';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const thought = typeof body?.thought === 'string' ? body.thought.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!thought) {
    return NextResponse.json({ error: 'Thought is required' }, { status: 400 });
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const config = getMailConfig();
    const transport = createMailTransport(config);
    await sendSubmissionEmail(transport, {
      kind: 'suggestion',
      thought,
      email,
      contactEmail: config.contactEmail,
      sender: config.sender,
    });

    // Send acknowledgement to the user if they left their email
    if (email) {
      try {
        await transport.sendMail({
          from: config.sender,
          to: email,
          ...suggestionAcknowledgementEmail({ thought }),
        });
      } catch (acknowledgementError) {
        // The permanent inbox already has the submission. Do not encourage a
        // duplicate retry just because the optional acknowledgement failed.
        console.error('Gmail SMTP acknowledgement delivery failed:', acknowledgementError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Gmail SMTP suggestion delivery failed:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
