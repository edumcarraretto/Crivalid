import { Component, type ErrorInfo, type ReactNode } from 'react'

interface AsyncSectionBoundaryProps {
  children: ReactNode
  minHeight?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class SectionErrorBoundary extends Component<AsyncSectionBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[AsyncSectionBoundary]', error, info.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto flex min-h-64 max-w-3xl items-center justify-center px-6 py-16 text-center">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Esta seção não carregou</h2>
            <p className="mt-2 text-sm text-neutral-600">Recarregue a página para tentar novamente.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-neutral-700"
            >
              Recarregar página
            </button>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

function SectionSkeleton({ minHeight = 'min-h-80' }: Pick<AsyncSectionBoundaryProps, 'minHeight'>) {
  return (
    <output
      className={`flex ${minHeight} items-center justify-center bg-white px-6`}
      aria-label="Carregando seção"
    >
      <span className="h-1.5 w-20 animate-pulse rounded-full bg-neutral-200" />
    </output>
  )
}

export { SectionErrorBoundary, SectionSkeleton }
