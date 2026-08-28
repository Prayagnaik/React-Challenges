import Link from 'next/link'

// serverComponent: this page is a Server Component by default
// fileBasedRouting: app/about/page.tsx maps to the "/about" route
// appDirectory: this page uses the Next.js App Router

export default function AboutPage() {
    return (
        <main>
            <h1>About Page</h1>

            <p>
                This is the About page for the Next.js App Router project.
            </p>

            <Link href="/">Home</Link>
        </main>
    )
}