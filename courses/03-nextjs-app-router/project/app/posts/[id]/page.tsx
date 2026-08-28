import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LikeButton from "../../components/LikeButton";

type Post = {
    id: number;
    title: string;
    body: string;
};

type PostPageProps = {
    params: {
        id: string;
    };
};

// Server Component
// dynamicSegment: Uses the dynamic [id] route.
// params: Reads the post ID from the URL.
// serverFetch: Fetches post data on the server.
// notFound: Handles missing posts.
// errorHandling: Handles invalid or missing resources.
// metadata: Provides metadata for the dynamic page.
// generateMetadata: Generates title and description from the post.
// clientComponent: LikeButton provides client-side interaction.
// fullstack: Combines Server and Client Components.
//useClient
// errorTsx


async function getPost(id: string): Promise<Post | null> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return null;
    }

    const post: Post = await response.json();

    return post;
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const post = await getPost(params.id);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested post could not be found.",
        };
    }

    return {
        title: `${post.title} | Next.js App Router`,
        description: post.body,
    };
}

export default async function PostPage({
    params,
}: PostPageProps) {
    const post = await getPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <Link href="/posts">← Back to Posts</Link>

            <article>
                <h1>{post.title}</h1>

                <p>{post.body}</p>

                <p>Post ID: {post.id}</p>

                <LikeButton />
            </article>
        </main>
    );
}