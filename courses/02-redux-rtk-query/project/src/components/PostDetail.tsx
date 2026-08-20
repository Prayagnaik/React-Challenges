import { useGetPostByIdQuery } from '../api/apiSlice'

type PostDetailProps = {
  id: number
}

function PostDetail({ id }: PostDetailProps) {
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError || !post) {
    return (
      <div data-testid="post-detail-error">
        Error loading post
      </div>
    )
  }

  return (
    <div data-testid="post-detail">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
    </div>
  )
}

export default PostDetail