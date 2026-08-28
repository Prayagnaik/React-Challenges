"use client";

import { useGetPostsQuery } from "../store/apiSlice";

// Client Component
// useClient: RTK Query hooks must run on the client.
// useGetPostsQuery: Generated RTK Query hook.
// rtkQuery: Fetches and caches API data.
// loadingState: Displays loading feedback.
// errorState: Displays API error feedback.
//createApi, fetchBaseQuery, useQuery, useMutation

export default function PostsList() {
    const {
        data: posts,
        isLoading,
        isError,
    } = useGetPostsQuery();

    if (isLoading) {
        return <p>Loading posts...</p>;
    }

    if (isError) {
        return <p>Failed to load posts.</p>;
    }

    if (!posts || posts.length === 0) {
        return <p>No posts found.</p>;
    }

    return (
        <section>
            <h2>Posts from RTK Query</h2>

            {posts.map((post) => (
                <article key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </article>
            ))}
        </section>
    );
}