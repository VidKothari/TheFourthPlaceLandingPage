import Link from 'next/link';
import styles from './RisoLegalPage.module.css';

export default function RisoLegalPage({
  eyebrow,
  title,
  summary,
  updated = '22 July 2026',
  children,
}) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#legal-content">
        Skip to policy
      </a>

      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="The Fourth Place home">
          The Fourth Place
        </Link>
        <Link className={styles.backLink} href="/">
          <span aria-hidden="true">←</span> Back to the landing
        </Link>
      </header>

      <main id="legal-content" className={styles.main}>
        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.summary}>{summary}</p>
          <p className={styles.updated}>
            Last updated <time dateTime="2026-07-22">{updated}</time>
          </p>
        </div>

        <article className={styles.policy}>{children}</article>
      </main>

      <footer className={styles.footer}>
        <p>The Fourth Place · a personal project by Siddharth Nikhil and Vidit Kothari</p>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}

export function LegalSection({ number, title, children }) {
  const headingId = `legal-section-${number}`;

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <p className={styles.sectionNumber} aria-hidden="true">
        {String(number).padStart(2, '0')}
      </p>
      <div>
        <h2 id={headingId}>{title}</h2>
        {children}
      </div>
    </section>
  );
}
