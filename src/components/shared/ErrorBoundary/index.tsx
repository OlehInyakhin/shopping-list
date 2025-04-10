import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * ErrorBoundary component for catching unexpected errors in the application
 * Prevents the entire application from crashing when an error occurs in one of the components
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also send the error to an analytics service
    console.error('Error in component:', error);
    console.error('Component information:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is defined, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise show the standard error UI
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              An error occurred while rendering this component.
            </p>
            <div className="bg-red-50 p-4 rounded-md text-left mb-4 overflow-auto max-h-40">
              <p className="text-red-800 font-mono text-sm">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
