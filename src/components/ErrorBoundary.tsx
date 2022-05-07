import { Component } from "react";

interface ErrorBoundaryInterface {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryInterface,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryInterface) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
