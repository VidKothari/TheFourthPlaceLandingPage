export const FORM_LIMITS = Object.freeze({
  requestBytes: 8 * 1024,
  emailCharacters: 254,
  thoughtCharacters: 1200,
  honeypotCharacters: 200,
});

const LOCAL_PART_PATTERN = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i;
const DOMAIN_LABEL_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

export function normalizeEmail(value) {
  if (typeof value !== 'string') return '';

  const email = value.trim().toLowerCase();
  if (!email || email.length > FORM_LIMITS.emailCharacters || /\s/.test(email)) {
    return '';
  }

  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@')) return '';

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (
    localPart.length > 64
    || !LOCAL_PART_PATTERN.test(localPart)
    || localPart.startsWith('.')
    || localPart.endsWith('.')
    || localPart.includes('..')
    || domain.length > 253
  ) {
    return '';
  }

  const labels = domain.split('.');
  if (
    labels.length < 2
    || labels.some((label) => !DOMAIN_LABEL_PATTERN.test(label))
    || !/^[a-z]{2,63}$/i.test(labels.at(-1))
  ) {
    return '';
  }

  return email;
}

export function normalizeThought(value) {
  if (typeof value !== 'string') return '';

  return value
    .replace(/\r\n?/g, '\n')
    .trim();
}

export function isHoneypotFilled(value) {
  if (value === undefined || value === null || value === '') return false;

  return typeof value !== 'string'
    || value.length > FORM_LIMITS.honeypotCharacters
    || value.trim().length > 0;
}

export function isCrossSiteFormRequest(request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return true;

  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin !== new URL(request.url).origin;
  } catch {
    return true;
  }
}

export async function readJsonFormBody(request) {
  const contentType = request.headers.get('content-type') ?? '';
  const mediaType = contentType.split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/json') {
    return {
      ok: false,
      status: 415,
      error: 'Content-Type must be application/json',
    };
  }

  const declaredLength = request.headers.get('content-length');
  if (declaredLength !== null) {
    const bytes = Number(declaredLength);
    if (!Number.isFinite(bytes) || bytes < 0 || bytes > FORM_LIMITS.requestBytes) {
      return {
        ok: false,
        status: 413,
        error: 'Submission is too large',
      };
    }
  }

  if (!request.body) {
    return {
      ok: false,
      status: 400,
      error: 'Invalid JSON body',
    };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let text = '';
  let receivedBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedBytes += value.byteLength;
      if (receivedBytes > FORM_LIMITS.requestBytes) {
        await reader.cancel();
        return {
          ok: false,
          status: 413,
          error: 'Submission is too large',
        };
      }

      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch {
    return {
      ok: false,
      status: 400,
      error: 'Invalid JSON body',
    };
  }

  try {
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new TypeError('Expected an object');
    }
    return { ok: true, body };
  } catch {
    return {
      ok: false,
      status: 400,
      error: 'Invalid JSON body',
    };
  }
}
