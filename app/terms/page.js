import RisoLegalPage, { LegalSection } from '../../components/redesign/RisoLegalPage';

export const metadata = {
  title: 'Terms — The Fourth Place',
  description: 'Terms for using The Fourth Place landing page and waitlist.',
};

export default function TermsPage() {
  return (
    <RisoLegalPage
      eyebrow="The ground rules"
      title="Terms, in human language."
      summary="These terms cover the current landing page, its waitlist, and the Open Floor suggestion form."
    >
      <LegalSection number={1} title="About this project">
        <p>
          The Fourth Place is currently a personal project operated by Siddharth Nikhil and Vidit
          Kothari. The project is based in Pune, Maharashtra, India. By using this website or submitting
          a form, you agree to these terms and the <a href="/privacy">Privacy Policy</a>.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Who may submit information">
        <p>
          You must be at least 16 years old to submit information through this landing page. Social
          features are for people aged 18 and older. The current landing page does not offer social
          features, age verification, or a guardian-approval flow; those controls are separate future
          product work.
        </p>
      </LegalSection>

      <LegalSection number={3} title="The waitlist">
        <p>
          Joining the waitlist expresses interest in The Fourth Place. It does not create an account,
          guarantee access, reserve a particular username or position, or promise that the product will
          launch on a particular date. We may change, pause, or discontinue the waitlist or project.
        </p>
        <p>
          By joining, you agree to receive launch news and occasional product updates. You can withdraw
          that permission by replying to an email or writing to{' '}
          <a href="mailto:data@thefourthplace.me">data@thefourthplace.me</a>.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Suggestions and feedback">
        <p>
          You keep ownership of the original material in a suggestion. By sending it, you give us
          permission to read, adapt, and use the feedback to develop The Fourth Place without an
          obligation to compensate you. Please do not submit confidential information, someone else&apos;s
          private information, or material you do not have the right to share.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Fair use of the website">
        <p>You agree not to:</p>
        <ul>
          <li>Misuse the forms, submit harmful code, or interfere with the website&apos;s operation.</li>
          <li>Use automated systems to spam, scrape, overload, or probe the website.</li>
          <li>Impersonate another person or submit unlawful, abusive, or infringing material.</li>
        </ul>
        <p>We may block abusive traffic or remove submissions that violate these terms.</p>
      </LegalSection>

      <LegalSection number={6} title="Site materials">
        <p>
          The Fourth Place name, original copy, design, and code are protected by applicable intellectual
          property laws. Names, marks, and materials belonging to third parties remain the property of
          their respective owners. These terms do not give you permission to reuse site materials beyond
          ordinary personal viewing of the website.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Early-stage availability">
        <p>
          This website and its content are provided on an &quot;as available&quot; basis. We try to keep the
          landing page accurate and working, but do not promise that it will always be uninterrupted,
          error-free, secure, or complete. To the extent permitted by law, we are not liable for indirect
          or consequential loss arising from use of this landing page.
        </p>
        <p>Nothing in these terms excludes any right or liability that cannot lawfully be excluded.</p>
      </LegalSection>

      <LegalSection number={8} title="Changes, law, and contact">
        <p>
          We may update these terms as the project develops. Updated terms will appear here with a new
          last-updated date. These terms are governed by the laws of India, and disputes will be subject
          to the courts in Pune, Maharashtra, unless applicable law requires otherwise.
        </p>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:data@thefourthplace.me">data@thefourthplace.me</a>.
        </p>
      </LegalSection>
    </RisoLegalPage>
  );
}
