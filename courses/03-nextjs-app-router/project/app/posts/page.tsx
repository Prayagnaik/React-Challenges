import Link from "next/link";
import AddPostForm from "../components/AddPostForm";
import PostsList from "./PostLists";

// Server Component
// searchParams: Read URL query parameters on the server.
// search: Filter posts using the q search parameter.
// pagination: Use the page parameter to paginate posts.
// searchAndPagination: This page supports search and pagination.
//useServer
//revalidatePath
//revalidateTag
// fetchCache
////metadata
//generateMetadata

export const dynamic = "force-dynamic";

type Post = {
    id: number;
    title: string;
    body: string;
};

type PostsPageProps = {
    searchParams: {
        q?: string;
        page?: string;
    };
};

async function getPosts(): Promise<Post[]> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return [];
    }

    return response.json();
}

export default async function PostsPage({
    searchParams,
}: PostsPageProps) {
    const posts = await getPosts();

    const query = searchParams.q?.trim().toLowerCase() || "";
    const currentPage = Math.max(
        1,
        Number.parseInt(searchParams.page || "1", 10) || 1
    );

    // Search: filter posts by title or body.
    const filteredPosts = query
        ? posts.filter(
            (post) =>
                post.title.toLowerCase().includes(query) ||
                post.body.toLowerCase().includes(query)
        )
        : posts;

    // Pagination: display 5 posts per page.
    const postsPerPage = 5;
    const totalPages = Math.max(
        1,
        Math.ceil(filteredPosts.length / postsPerPage)
    );

    const safePage = Math.min(currentPage, totalPages);

    const startIndex = (safePage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(
        startIndex,
        startIndex + postsPerPage
    );

    return (
        <main>
            <h1>Posts</h1>

            <AddPostForm />
            <PostsList />

            <form method="get" action="/posts">
                <label htmlFor="search">Search posts: </label>

                <input
                    id="search"
                    name="q"
                    type="search"
                    defaultValue={searchParams.q || ""}
                    placeholder="Search posts..."
                />

                <button type="submit">Search</button>
            </form>

            {paginatedPosts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <div>
                    {paginatedPosts.map((post) => (
                        <article key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </article>
                    ))}
                </div>
            )}

            <nav aria-label="Pagination">
                {safePage > 1 && (
                    <Link
                        href={`/posts?page=${safePage - 1}${query ? `&q=${encodeURIComponent(query)}` : ""
                            }`}
                    >
                        Previous
                    </Link>
                )}

                <span>
                    {" "}
                    Page {safePage} of {totalPages}{" "}
                </span>

                {safePage < totalPages && (
                    <Link
                        href={`/posts?page=${safePage + 1}${query ? `&q=${encodeURIComponent(query)}` : ""
                            }`}
                    >
                        Next
                    </Link>
                )}
            </nav>
        </main>
    );
}