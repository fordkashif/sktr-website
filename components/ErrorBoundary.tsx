"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="py-12 flex items-center justify-center border border-[rgba(131,145,190,0.2)]">
            <p className="mono text-[rgba(232,235,240,0.38)]">
              Section unavailable
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
