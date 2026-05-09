'use client';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      const { error, info } = this.state;
      return (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#000', color: '#0f0',
          fontFamily: 'monospace', fontSize: '12px',
          padding: '24px', overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{ color: '#ff4444', fontSize: '16px', marginBottom: '16px', fontWeight: 'bold' }}>
            💥 React Render Error
          </div>
          <div style={{ color: '#ffcc00', marginBottom: '8px' }}>
            {error?.name}: {error?.message}
          </div>
          <pre style={{ color: '#aaa', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '11px', marginBottom: '16px' }}>
            {error?.stack}
          </pre>
          <div style={{ color: '#ffcc00', marginBottom: '8px' }}>Component Stack:</div>
          <pre style={{ color: '#888', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '10px' }}>
            {info?.componentStack}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null, info: null })}
            style={{ marginTop: '24px', background: '#333', color: '#fff', border: '1px solid #555', padding: '8px 16px', cursor: 'pointer', fontSize: '12px' }}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
