import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Report');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // In production, you might want to send to a service like Sentry
    // Example:
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack
    //     }
    //   }
    // });
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorReport = {
      id: errorId,
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      componentStack: errorInfo?.componentStack || 'No component stack',
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // Create mailto link with error details
    const subject = encodeURIComponent(`Portfolio Error Report - ${errorId}`);
    const body = encodeURIComponent(`
Hi Prosper,

I encountered an error on your portfolio website. Here are the details:

Error ID: ${errorReport.id}
Error Message: ${errorReport.message}
URL: ${errorReport.url}
Browser: ${errorReport.userAgent}
Timestamp: ${errorReport.timestamp}

Technical Details:
${errorReport.stack}

Component Stack:
${errorReport.componentStack}

Please let me know if you need any additional information.

Best regards,
A visitor to your portfolio
    `);

    window.open(`mailto:nelsonprox92@gmail.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      const { error, errorId } = this.state;
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full"
          >
            <div className="card-ai p-8 text-center">
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
              >
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </motion.div>

              {/* Error Title */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-primary mb-4"
              >
                Oops! Something went wrong
              </motion.h1>

              {/* Error Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-secondary mb-6 leading-relaxed"
              >
                I apologize for the inconvenience. An unexpected error occurred while loading this part of my portfolio. 
                This has been automatically logged and I'll investigate it promptly.
              </motion.p>

              {/* Error ID */}
              {errorId && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <p className="text-sm text-tertiary">
                    Error ID: <code className="font-mono font-semibold">{errorId}</code>
                  </p>
                </motion.div>
              )}

              {/* Development Error Details */}
              {isDevelopment && error && (
                <motion.details
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg text-left"
                >
                  <summary className="cursor-pointer font-semibold text-red-700 dark:text-red-300 mb-2">
                    Developer Details (Development Mode)
                  </summary>
                  <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                    {error.toString()}
                    {error.stack && '\n\nStack Trace:\n' + error.stack}
                  </pre>
                </motion.details>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={this.handleRetry}
                  className="btn-ai px-6 py-3 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="px-6 py-3 border border-primary rounded-lg text-primary hover:bg-secondary transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>

                <button
                  onClick={this.handleReportError}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-tertiary hover:text-primary hover:border-primary transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Report Issue
                </button>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-primary"
              >
                <p className="text-sm text-tertiary">
                  If this problem persists, please don't hesitate to reach out to me directly at{' '}
                  <a 
                    href="mailto:nelsonprox92@gmail.com" 
                    className="text-ai-primary hover:underline font-medium"
                  >
                    nelsonprox92@gmail.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;