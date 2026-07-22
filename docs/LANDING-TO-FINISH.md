# Landing: remaining production work

This list tracks work that is intentionally not part of the root-route migration.

## Content

- [ ] Replace the current exhibition placeholders with new John-and-Jane items in a final guided content pass. Confirm the right-to-use source or licence for every asset before publishing.
- [x] Use John and Jane as the fictional Taste Map demo names across the active landing and copy inventory.

## Legal and privacy

- [x] Publish a Privacy Policy for The Fourth Place, operated personally by Siddharth Nikhil and Vidit Kothari and based in Pune, Maharashtra, India. Describe waitlist/suggestion data, email delivery, retention, product-update consent, processors, user rights, and `data@thefourthplace.me` as the privacy contact.
- [x] Publish landing-page Terms governed by Indian law with Pune, Maharashtra jurisdiction. State the 16+ / 18+ boundaries without claiming that the deferred guardian flow exists.
- [x] Do not add a cookie policy, cookie banner, or settings control while the landing has no non-essential cookies or consent-managed storage. Revisit if analytics, advertising, or similar storage is introduced.
- [x] Add accessible footer links to Privacy and Terms.

## Production release checks

- [x] Production email sender/recipient environment variables are configured in Vercel; credentials remain uncommitted.
- [x] Keep Gmail as the current waitlist/suggestion record; validate and limit request bodies, reject cross-site browser submissions, use honeypots, and bound SMTP connection time.
- [x] Run the production build, form tests, lint, dependency audit, and local route/header smoke tests on Next.js 16.2.11.
- [ ] Verify the deployed root URL, metadata preview, form delivery, video playback, desktop/mobile layouts, and all footer/legal links.
