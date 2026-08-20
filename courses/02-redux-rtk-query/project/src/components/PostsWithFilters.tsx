import { useGetPostsQuery } from '../api/apiSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setSortBy,
  setFilterUserId,
} from '../store/slices/filtersSlice'

function PostsWithFilters() {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useGetPostsQuery()

  const filters = useAppSelector((state) => state.filters)
  const dispatch = useAppDispatch()

  let filteredPosts = [...posts]

  if (filters.filterUserId !== null) {
    filteredPosts = filteredPosts.filter(
      (post) => post.userId === filters.filterUserId
    )
  }

  filteredPosts.sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return b.id - a.id
    }

    return a.id - b.id
  })

  if (isLoading) {
    return <div>Loading posts...</div>
  }

  if (isError) {
    return <div>Error loading posts</div>
  }

  return (
    <div data-testid="posts-with-filters">
      <h2>Posts</h2>

      <div data-testid="filter-controls">
        <label>
          Sort:{' '}
          <select
            value={filters.sortBy}
            onChange={(event) =>
              dispatch(
                setSortBy(
                  event.target.value as 'newest' | 'oldest'
                )
              )
            }
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>

        {' '}

        <label>
          User:{' '}
          <select
            value={filters.filterUserId ?? ''}
            onChange={(event) =>
              dispatch(
                setFilterUserId(
                  event.target.value === ''
                    ? null
                    : Number(event.target.value)
                )
              )
            }
          >
            <option value="">All users</option>
            <option value="1">John</option>
            <option value="2">Jane</option>
            <option value="3">Bob</option>
          </select>
        </label>
      </div>

      <div>
        {filteredPosts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>User ID: {post.userId}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PostsWithFilters