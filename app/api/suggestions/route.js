import { NextResponse } from 'next/server';
import {
  createMailTransport,
  getMailConfig,
  sendSubmissionEmail,
} from '../../../lib/landing-email.mjs';
import {
  FORM_LIMITS,
  isCrossSiteFormRequest,
  isHoneypotFilled,
  normalizeEmail,
  normalizeThought,
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

  if (isHoneypotFilled(parsed.body.website)) {
    return json({ success: true });
  }

  const thought = normalizeThought(parsed.body.thought);
  const hasEmailValue = parsed.body.email !== undefined
    && parsed.body.email !== null
    && parsed.body.email !== '';
  if (hasEmailValue && typeof parsed.body.email !== 'string') {
    return json({ error: 'Invalid email' }, 400);
  }

  const rawEmail = typeof parsed.body.email === 'string' ? parsed.body.email : '';
  const email = rawEmail ? normalizeEmail(rawEmail) : '';

  if (!thought) {
    return json({ error: 'Thought is required' }, 400);
  }

  if (thought.length > FORM_LIMITS.thoughtCharacters) {
    return json({ error: 'Thought is too long' }, 400);
  }

  if (rawEmail && !email) {
    return json({ error: 'Invalid email' }, 400);
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

    return json({ success: true });
  } catch (err) {
    console.error('Gmail SMTP suggestion delivery failed:', err);
    return json({ error: 'Unable to process this submission right now' }, 500);
  }
}
