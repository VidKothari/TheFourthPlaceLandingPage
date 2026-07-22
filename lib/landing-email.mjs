import nodemailer from 'nodemailer';

export function getMailConfig(env = process.env) {
  const user = env.GMAIL_USER?.trim();
  // Google displays app passwords in groups, but SMTP expects the raw value.
  const password = env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  const contactEmail = env.CONTACT_EMAIL?.trim();

  if (!user || !password || !contactEmail) {
    throw new Error('Gmail SMTP is not configured');
  }

  return {
    user,
    password,
    contactEmail,
    sender: `The Fourth Place <${user}>`,
  };
}

export function createMailTransport({ user, password }) {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

const COLORS = {
  ink: '#161310',
  paper: '#efe6d0',
  magenta: '#e5399f',
  purple: '#6d4aff',
  muted: '#9c9380',
};

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function frame({ eyebrow, title, intro, content, timestamp }) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${COLORS.ink};color:${COLORS.paper};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLORS.ink};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:${COLORS.paper};border:2px solid ${COLORS.ink};box-shadow:8px 8px 0 ${COLORS.magenta};color:${COLORS.ink};">
            <tr>
              <td style="height:10px;background:linear-gradient(90deg,${COLORS.magenta} 0 52%,${COLORS.purple} 52% 100%);font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:34px 38px 18px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 22px;font-size:11px;font-weight:700;line-height:1.4;letter-spacing:0.2em;text-transform:uppercase;color:${COLORS.magenta};">${eyebrow}</p>
                <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:400;line-height:1.12;color:${COLORS.ink};">${title}</h1>
                <p style="margin:0;font-size:15px;line-height:1.65;color:#554f45;">${intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 38px 36px;font-family:Arial,Helvetica,sans-serif;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 38px;background:${COLORS.ink};font-family:Arial,Helvetica,sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:${COLORS.paper};">The Fourth Place</td>
                    <td align="right" style="font-size:10px;line-height:1.4;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.muted};">${timestamp}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function waitlistEmail({ email, position = null, submittedAt = new Date() }) {
  const safeEmail = escapeHtml(email);
  const timestamp = escapeHtml(submittedAt.toUTCString());
  const positionMarkup = position
    ? `<span style="display:inline-block;margin-left:8px;padding:5px 9px;background:${COLORS.purple};color:#fff;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;vertical-align:middle;">No. ${escapeHtml(position)}</span>`
    : '';

  return {
    subject: position ? `Waitlist signup — No. ${position}` : 'New waitlist signup',
    text: `New waitlist signup: ${email}${position ? ` (No. ${position})` : ''}\nSubmitted: ${submittedAt.toUTCString()}`,
    html: frame({
      eyebrow: 'Waitlist / New arrival',
      title: 'Someone found the door.',
      intro: 'A new person has asked to hear from us when The Fourth Place opens.',
      timestamp,
      content: `
        <div style="margin-top:14px;padding:22px 20px;border:2px solid ${COLORS.ink};background:#f7f0df;">
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#746c5d;">Email address</p>
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.35;color:${COLORS.ink};word-break:break-word;">
            <a href="mailto:${safeEmail}" style="color:${COLORS.ink};text-decoration:none;">${safeEmail}</a>${positionMarkup}
          </p>
        </div>`,
    }),
  };
}

export function suggestionEmail({ thought, email = '', submittedAt = new Date() }) {
  const safeThought = escapeHtml(thought).replaceAll('\n', '<br>');
  const safeEmail = escapeHtml(email);
  const timestamp = escapeHtml(submittedAt.toUTCString());
  const senderMarkup = email
    ? `<div style="margin-top:18px;padding-top:16px;border-top:1px solid #cfc4aa;">
        <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#746c5d;">Reply to</p>
        <a href="mailto:${safeEmail}" style="font-size:14px;color:${COLORS.purple};text-decoration:none;word-break:break-word;">${safeEmail}</a>
      </div>`
    : `<p style="margin:18px 0 0;font-size:12px;font-style:italic;color:#746c5d;">Submitted anonymously.</p>`;

  return {
    subject: 'A new thought from the Open Floor',
    text: `New Open Floor submission:\n\n${thought}${email ? `\n\nReply to: ${email}` : '\n\nSubmitted anonymously.'}\n\nSubmitted: ${submittedAt.toUTCString()}`,
    html: frame({
      eyebrow: 'Open Floor / New thought',
      title: 'A note was left for us.',
      intro: 'One of the first people through the door has shared an idea for what this place could become.',
      timestamp,
      content: `
        <div style="margin-top:14px;padding:22px 20px;border-left:6px solid ${COLORS.magenta};background:#f7f0df;">
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.65;color:${COLORS.ink};">${safeThought}</p>
          ${senderMarkup}
        </div>`,
    }),
  };
}

export async function sendSubmissionEmail(
  transport,
  { kind, email, thought, position, submittedAt = new Date(), contactEmail, sender },
) {
  let message;
  if (kind === 'waitlist') {
    message = waitlistEmail({ email, position, submittedAt });
  } else if (kind === 'suggestion') {
    message = suggestionEmail({ thought, email, submittedAt });
  } else {
    throw new TypeError(`Unsupported landing submission kind: ${kind}`);
  }

  return transport.sendMail({
    from: sender,
    to: contactEmail,
    ...(kind === 'suggestion' && email ? { replyTo: email } : {}),
    ...message,
  });
}
