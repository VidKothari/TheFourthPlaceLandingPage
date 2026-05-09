'use client';
import ErrorBoundary from './ErrorBoundary';

// This thin wrapper exists so layout.js (a Server Component) can import
// and render the ErrorBoundary without triggering the "use client" restriction.
export default function ClientErrorBoundary({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
