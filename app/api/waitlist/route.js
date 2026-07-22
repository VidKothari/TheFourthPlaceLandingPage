import { NextResponse } from 'next/server';
import {
  createMailTransport,
  getMailConfig,
  sendSubmissionEmail,
} from '../../../lib/landing-email.mjs';
import {
  isCrossSiteFormRequest,
  isHoneypotFilled,
  normalizeEmail,
  readJsonFormBody,
} from '../../../lib/landing-form.mjs';

export const runtime = 'nodejs';

function json(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request) {
  if (isCrossSiteFormRequest(request)) {
    return json({ error: 'Cross-site submissions are not allowed' }, 403);
  }

  const parsed = await readJsonFormBody(request);
  if (!parsed.ok) {
    return json({ error: parsed.error }, parsed.status);
  }

  // Bots commonly fill fields hidden from people. Return the normal success
  // shape without touching SMTP so the trap is not advertised.
  if (isHoneypotFilled(parsed.body.website)) {
    return json({ success: true, position: null });
  }

  const email = normalizeEmail(parsed.body.email);
  if (!email) {
    return json({ error: 'Invalid email' }, 400);
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

    return json({ success: true, position: null });
  } catch (error) {
    console.error('Gmail SMTP waitlist delivery failed:', error);
    return json({ error: 'Unable to process this submission right now' }, 500);
  }
}
