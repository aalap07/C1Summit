import React from 'react';

//Class used to catch errors
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      console.log(error);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;