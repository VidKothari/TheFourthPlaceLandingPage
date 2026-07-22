import { describe, expect, test } from 'bun:test';
import { POST as submitSuggestion } from '../app/api/suggestions/route.js';
import { POST as joinWaitlist } from '../app/api/waitlist/route.js';

function jsonRequest(body, headers = {}) {
  return new Request('http://localhost/api/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

describe('landing form route validation', () => {
  test('routes reject browser submissions from another site', async () => {
    const response = await joinWaitlist(jsonRequest(
      { email: 'person@example.com' },
      { Origin: 'https://spam.example', 'Sec-Fetch-Site': 'cross-site' },
    ));

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      error: 'Cross-site submissions are not allowed',
    });
  });

  test('routes accept an explicit same-origin browser request', async () => {
    const response = await submitSuggestion(jsonRequest(
      { thought: 'Spam', website: 'spam.example' },
      { Origin: 'http://localhost', 'Sec-Fetch-Site': 'same-origin' },
    ));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
  });

  test('routes require JSON requests', async () => {
    const response = await joinWaitlist(new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'email=person@example.com',
    }));

    expect(response.status).toBe(415);
    expect(await response.json()).toEqual({
      error: 'Content-Type must be application/json',
    });
  });

  test('routes reject malformed JSON', async () => {
    const response = await submitSuggestion(new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"thought":',
    }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid JSON body' });
  });

  test('routes reject requests over the body limit before delivery', async () => {
    const response = await submitSuggestion(jsonRequest(
      { thought: 'A good idea' },
      { 'Content-Length': String(9 * 1024) },
    ));

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: 'Submission is too large' });
  });

  test('routes enforce the body limit even without a content-length header', async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(JSON.stringify({
          thought: 'x'.repeat(9 * 1024),
        })));
        controller.close();
      },
    });
    const response = await submitSuggestion(new Request('http://localhost/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: stream,
      duplex: 'half',
    }));

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: 'Submission is too large' });
  });

  test('waitlist rejects an invalid email before attempting delivery', async () => {
    const response = await joinWaitlist(jsonRequest({ email: 'not-an-email' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid email' });
  });

  test('waitlist honeypot returns the public success shape without requiring SMTP', async () => {
    const response = await joinWaitlist(jsonRequest({
      email: 'person@example.com',
      website: 'https://spam.example',
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ success: true, position: null });
  });

  test('suggestions require a non-empty thought', async () => {
    const response = await submitSuggestion(jsonRequest({ thought: '   ' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Thought is required' });
  });

  test('suggestions reject a malformed optional email', async () => {
    const response = await submitSuggestion(jsonRequest({
      thought: 'A good idea',
      email: 'wrong',
    }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid email' });
  });

  test('suggestions reject a non-string optional email', async () => {
    const response = await submitSuggestion(jsonRequest({
      thought: 'A good idea',
      email: ['person@example.com'],
    }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid email' });
  });

  test('suggestions enforce the server-side thought limit', async () => {
    const response = await submitSuggestion(jsonRequest({
      thought: 'x'.repeat(1201),
    }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Thought is too long' });
  });

  test('suggestion honeypot returns success without requiring SMTP', async () => {
    const response = await submitSuggestion(jsonRequest({
      thought: 'Spam',
      website: 'spam.example',
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
  });
});
