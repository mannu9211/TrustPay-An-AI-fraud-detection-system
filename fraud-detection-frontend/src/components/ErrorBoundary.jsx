
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Keep the original behavior of logging the error
    // so it appears in the dev console.
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <pre>{error ? String(error) : "Unknown error"}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;