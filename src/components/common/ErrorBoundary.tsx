'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-6 text-6xl">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-white">Something went wrong</h2>
          <p className="mb-6 max-w-md text-gray-400">
            We encountered an unexpected error. Please try again or refresh the page.
          </p>
          <Button onClick={this.handleRetry} variant="holo">
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
