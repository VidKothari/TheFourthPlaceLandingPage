'use client';
import { Component, createRef } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.headingRef = createRef();
    this.handleRetry = this.handleRetry.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info);
    }

    this.headingRef.current?.focus();
  }

  handleRetry() {
    this.setState({ hasError: false });
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          aria-labelledby="recovery-title"
          aria-describedby="recovery-description"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'grid',
            minHeight: '100dvh',
            overflowY: 'auto',
            padding: 'clamp(1.25rem, 4vw, 3rem)',
            background: '#f2ede3',
            color: '#161310',
            fontFamily: "var(--sans, 'Helvetica Neue', Arial, sans-serif)",
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <section
            style={{
              position: 'relative',
              display: 'grid',
              alignContent: 'space-between',
              width: 'min(100%, 72rem)',
              minHeight: 'calc(100dvh - clamp(2.5rem, 8vw, 6rem))',
              margin: 'auto',
              padding: 'clamp(1.5rem, 5vw, 4.5rem)',
              border: '2px solid #161310',
              boxShadow: 'clamp(6px, 1vw, 12px) clamp(6px, 1vw, 12px) 0 #d72873',
              background: '#faf7f0',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 'clamp(4rem, 13vw, 10rem)',
                height: 'clamp(0.75rem, 2vw, 1.25rem)',
                background: '#00a6a6',
              }}
            />

            <p style={{
              margin: 0,
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}>
              The Fourth Place · Intermission
            </p>

            <div style={{ maxWidth: '43rem', padding: 'clamp(3rem, 10vh, 7rem) 0' }}>
              <h1
                ref={this.headingRef}
                id="recovery-title"
                tabIndex="-1"
                style={{
                  margin: '0 0 1.25rem',
                  outline: 'none',
                  fontFamily: "var(--serif, Georgia, 'Times New Roman', serif)",
                  fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: '-0.045em',
                }}
              >
                We lost the thread.
              </h1>
              <p
                id="recovery-description"
                style={{
                  maxWidth: '35rem',
                  margin: '0 0 2rem',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                This room did not load as expected. Try opening it again, or
                refresh the page for a clean start.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.875rem',
                }}
              >
                <button
                  type="button"
                  className="recovery-button recovery-button-primary"
                  onClick={this.handleRetry}
                >
                  Try again
                </button>
                <button
                  type="button"
                  className="recovery-button recovery-button-secondary"
                  onClick={this.handleReload}
                >
                  Reload page
                </button>
              </div>
            </div>

            <p style={{
              margin: 0,
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.65,
            }}>
              A temporary pause, not the end of the exhibition.
            </p>
          </section>

          <style jsx>{`
            .recovery-button {
              min-height: 3rem;
              padding: 0.75rem 1.5rem;
              border: 2px solid #161310;
              font: 600 0.8rem/1 var(--sans, 'Helvetica Neue', Arial, sans-serif);
              letter-spacing: 0.08em;
              text-transform: uppercase;
              cursor: pointer;
              transition: transform 120ms ease, box-shadow 120ms ease;
            }

            .recovery-button-primary {
              background: #161310;
              color: #faf7f0;
              box-shadow: 4px 4px 0 #00a6a6;
            }

            .recovery-button-secondary {
              background: transparent;
              color: #161310;
            }

            .recovery-button:hover {
              transform: translate(-1px, -1px);
            }

            .recovery-button:active {
              transform: translate(2px, 2px);
              box-shadow: none;
            }

            .recovery-button:focus-visible {
              outline: 3px solid #d72873;
              outline-offset: 3px;
            }

            @media (prefers-reduced-motion: reduce) {
              .recovery-button {
                transition: none;
              }
            }
          `}</style>
        </main>
      );
    }

    return this.props.children;
  }
}
