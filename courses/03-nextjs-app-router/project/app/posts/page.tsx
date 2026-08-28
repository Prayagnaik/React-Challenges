import { Suspense } from 'react'
import AddPostForm from '../components/AddPostForm'

export const dynamic = 'force-dynamic'

// Server Component
// useServer
// serverAction
// revalidatePath
// revalidateTag

type Post = {
    id: number
    title: string
    body: string
}

async function PostsContent() {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            cache: 'no-store',
        }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    const posts: Post[] = await response.json()

    return (
        <div>
            {posts.map((post) => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </article>
            ))}
        </div>
    )
}

export default function PostsPage() {
    return (
        <main>
            <h1>Posts</h1>

            {/* Client Component using Server Action */}
            <AddPostForm />

            <Suspense fallback={<p>Loading posts...</p>}>
                <PostsContent />
            </Suspense>
        </main>
    )
}