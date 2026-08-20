type ErrorDisplayProps = {
  error: unknown
  onRetry?: () => void
}

function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  let message = 'Something went wrong while loading the data.'

  if (typeof error === 'object' && error !== null && 'error' in error) {
    const errorMessage = (error as { error?: string }).error

    if (errorMessage) {
      message = errorMessage
    }
  }

  return (
    <div data-testid="error-display">
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          data-testid="retry-btn"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay