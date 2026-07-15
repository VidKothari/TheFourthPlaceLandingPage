import assert from 'node:assert/strict';
import { test } from 'bun:test';
import {
  getMailConfig,
  sendSubmissionEmail,
  suggestionEmail,
  waitlistEmail,
} from '../lib/landing-email.mjs';

const submittedAt = new Date('2026-07-16T12:00:00.000Z');

test('waitlist notification uses branded HTML and escapes submitted email', () => {
  const message = waitlistEmail({
    email: 'person+<tag>@example.com',
    position: 42,
    submittedAt,
  });

  assert.match(message.subject, /42/);
  assert.match(message.html, /Someone found the door/);
  assert.match(message.html, /person\+&lt;tag&gt;@example\.com/);
  assert.doesNotMatch(message.html, /person\+<tag>@example\.com/);
  assert.match(message.text, /person\+<tag>@example\.com/);
});

test('suggestion notification preserves line breaks safely', () => {
  const message = suggestionEmail({
    thought: 'Add <script>alert(1)</script>\nThen add circles.',
    email: 'hello@example.com',
    submittedAt,
  });

  assert.match(message.html, /Add &lt;script&gt;alert\(1\)&lt;\/script&gt;<br>Then add circles\./);
  assert.doesNotMatch(message.html, /<script>/);
  assert.match(message.html, /hello@example\.com/);
});

test('mail config strips spaces from a Google app password', () => {
  const config = getMailConfig({
    GMAIL_USER: 'sender@example.com',
    GMAIL_APP_PASSWORD: 'abcd efgh ijkl mnop',
    CONTACT_EMAIL: 'inbox@example.com',
  });

  assert.equal(config.password, 'abcdefghijklmnop');
  assert.equal(config.sender, 'The Fourth Place <sender@example.com>');
});

test('delivery helper targets the configured contact inbox with safe reply-to', async () => {
  const deliveries = [];
  const transport = {
    sendMail: async (payload) => {
      deliveries.push(payload);
      return { messageId: 'mock-email-id' };
    },
  };

  const result = await sendSubmissionEmail(transport, {
    kind: 'suggestion',
    thought: 'A shared shelf for friends.',
    email: 'person@example.com',
    contactEmail: 'inbox@example.com',
    sender: 'The Fourth Place <sender@example.com>',
    submittedAt,
  });

  assert.equal(result.messageId, 'mock-email-id');
  assert.equal(deliveries.length, 1);
  assert.equal(deliveries[0].to, 'inbox@example.com');
  assert.equal(deliveries[0].replyTo, 'person@example.com');
  assert.match(deliveries[0].html, /A note was left for us/);
});

test('waitlist delivery uses the configured contact inbox without reply-to', async () => {
  const deliveries = [];
  const transport = {
    sendMail: async (payload) => {
      deliveries.push(payload);
      return { messageId: 'mock-waitlist-id' };
    },
  };

  await sendSubmissionEmail(transport, {
    kind: 'waitlist',
    email: 'person@example.com',
    contactEmail: 'inbox@example.com',
    sender: 'The Fourth Place <sender@example.com>',
    submittedAt,
  });

  assert.equal(deliveries[0].to, 'inbox@example.com');
  assert.equal(deliveries[0].replyTo, undefined);
  assert.match(deliveries[0].html, /Someone found the door/);
});
