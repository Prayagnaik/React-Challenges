import { FormEvent, useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('1')

  const [addPost, { isLoading, isSuccess, isError }] = useAddPostMutation()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim() || !body.trim()) {
      return
    }

    await addPost({
      userId: Number(userId),
      title: title.trim(),
      body: body.trim(),
    }).unwrap()

    setTitle('')
    setBody('')
  }

  return (
    <form
      data-testid="add-post-form"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '500px',
      }}
    >
      <h2>Add Post</h2>

      <label>
        User ID
        <input
          type="number"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          min="1"
        />
      </label>

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter post title"
        />
      </label>

      <label>
        Body
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Enter post content"
        />
      </label>

      <button
        type="submit"
        data-testid="add-post-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>

      {isSuccess && <p>Post added successfully!</p>}

      {isError && <p>Failed to add post. Please try again.</p>}
    </form>
  )
}