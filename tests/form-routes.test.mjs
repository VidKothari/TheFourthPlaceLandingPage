import { describe, expect, test } from 'bun:test';
import { POST as submitSuggestion } from '../app/api/suggestions/route.js';
import { POST as joinWaitlist } from '../app/api/waitlist/route.js';

function jsonRequest(body) {
  return new Request('http://localhost/api/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('landing form route validation', () => {
  test('waitlist rejects an invalid email before attempting delivery', async () => {
    const response = await joinWaitlist(jsonRequest({ email: 'not-an-email' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Invalid email' });
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
});
