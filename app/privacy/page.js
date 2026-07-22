import RisoLegalPage, { LegalSection } from '../../components/redesign/RisoLegalPage';

export const metadata = {
  title: 'Privacy Policy — The Fourth Place',
  description: 'How The Fourth Place handles information submitted through its landing page.',
};

export default function PrivacyPage() {
  return (
    <RisoLegalPage
      eyebrow="Your information"
      title="Privacy, without the fog."
      summary="A plain account of what this early landing page collects, why it collects it, and the choices you have."
    >
      <LegalSection number={1} title="Who is responsible">
        <p>
          The Fourth Place is currently a personal project operated by Siddharth Nikhil and Vidit
          Kothari. The project is based in Pune, Maharashtra, India. Questions or requests about your
          information can be sent to{' '}
          <a href="mailto:data@thefourthplace.me">data@thefourthplace.me</a>.
        </p>
      </LegalSection>

      <LegalSection number={2} title="What the landing page collects">
        <p>We collect only the information you choose to send through the landing page:</p>
        <ul>
          <li>Your email address when you join the waitlist.</li>
          <li>Your suggestion, and an optional email address, when you use the Open Floor form.</li>
        </ul>
        <p>
          The hosting infrastructure may also process basic request information such as an IP address,
          browser details, timestamps, and security logs to deliver and protect the website. We do not
          currently use advertising trackers or analytics cookies.
        </p>
      </LegalSection>

      <LegalSection number={3} title="How the information is used">
        <p>We use submitted information to:</p>
        <ul>
          <li>Manage the waitlist and send launch news or occasional product updates.</li>
          <li>Read suggestions, improve the project, and reply when you invite a follow-up.</li>
          <li>Operate, secure, and troubleshoot the landing page.</li>
        </ul>
        <p>
          Sending an optional email with a suggestion does not add you to the waitlist. You can stop
          product updates at any time by replying to an email or contacting us.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Where it goes">
        <p>
          Waitlist entries and suggestions are delivered to and held in the project&apos;s Gmail inbox.
          Google therefore processes that information as an email service provider. Website hosting and
          security providers may process the limited technical information needed to run the site.
        </p>
        <p>
          We do not sell or rent your personal information. We may disclose information if required by
          law, or when reasonably necessary to protect the website and its users.
        </p>
      </LegalSection>

      <LegalSection number={5} title="How long it is kept">
        <p>
          Waitlist information is kept while the waitlist remains active or until you ask us to remove
          it. Suggestions and related correspondence are kept only while they remain useful for the
          project or a follow-up. Information may be retained longer where reasonably necessary for
          security, dispute resolution, or a legal obligation.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Your choices">
        <p>
          You may ask what personal information we hold about you, request a correction or deletion,
          withdraw consent for future messages, or raise a privacy concern. Email{' '}
          <a href="mailto:data@thefourthplace.me">data@thefourthplace.me</a> from the address connected
          to your request so we can identify the right record.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Age and this landing page">
        <p>
          The Fourth Place is intended for people aged 16 and older, and social features are reserved for
          adults aged 18 and older. This landing page does not currently provide age verification or a
          guardian-approval flow. If you are under 16, do not submit information here. If you believe
          someone under 16 has done so, contact us and we will review and remove it.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Changes to this policy">
        <p>
          This policy may change as the project develops or the landing page begins using new services.
          Material changes will be reflected here with a new last-updated date. If a change meaningfully
          affects how waitlist information is used, we will provide an appropriate notice.
        </p>
      </LegalSection>
    </RisoLegalPage>
  );
}
