'use client'

import { useEffect } from 'react'

type ErrorPageProps = {
    error: Error & { digest?: string }
    reset: () => void
}

// Client Component
// useClient
// errorBoundary
// errorHandling
// errorTsx
// notFound
// reset
// reset()
//dynamicSegment, useClient, notFound, metadata

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        // Error boundary receives the error from the failed route.
        void error
    }, [error])

    return (
        <main>
            <h1>Something went wrong </h1>
            < p > We were unable to load this page.</p>

            < button type="button" onClick={() => reset()
            }>
                Try again
            </button>
        </main>
    )
}