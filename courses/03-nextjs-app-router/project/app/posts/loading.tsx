import { Suspense } from 'react'

// loadingTsx

function LoadingContent() {
    return (
        <main>
            <h1>Posts</h1>
            <p data-testid="posts-loading">Loading posts...</p>
        </main>
    )
}

export default function Loading() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <LoadingContent />
        </Suspense>
    )
}