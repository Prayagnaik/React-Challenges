import { NextResponse } from 'next/server'

type Post = {
    id: number
    title: string
    body: string
}

const posts: Post[] = [
    {
        id: 1,
        title: 'First Post',
        body: 'This is the first post.',
    },
    {
        id: 2,
        title: 'Learning Next.js',
        body: 'Server Components can fetch data directly.',
    },
    {
        id: 3,
        title: 'Data Fetching',
        body: 'This post was fetched from a local API route.',
    },
]

export async function GET() {
    return NextResponse.json(posts)
}