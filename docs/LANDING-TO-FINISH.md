# Landing: remaining production work

This list tracks work that is intentionally not part of the root-route migration.

## Content

- [ ] Replace the current exhibition placeholders with recognisable, culturally relevant posters and covers. Confirm the right-to-use source or licence for every asset before publishing.
- [ ] Hardcode the final names displayed in the Taste Map, then check their spelling, capitalisation, and placement against the product data.

## Legal and privacy

- [ ] Publish a Privacy Policy that describes landing analytics, waitlist/suggestion form data, email delivery, retention, and contact details.
- [ ] Publish Terms of Use appropriate to the product and waitlist.
- [ ] Publish a Cookie Policy with the cookies or similar technologies actually used in production.
- [ ] Add accessible footer links to the three legal pages.
- [ ] Add a cookie-settings control only if non-essential cookies or similar consent-managed storage are introduced; wire it to the real consent mechanism and verify that it persists.

## Production release checks

- [ ] Set the production environment variables for the form-email sender and recipient in the deployment provider; do not commit credentials.
- [ ] Verify the deployed root URL, metadata preview, form delivery, video playback, desktop/mobile layouts, and all footer/legal links.
