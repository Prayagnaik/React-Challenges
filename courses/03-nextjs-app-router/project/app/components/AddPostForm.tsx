'use client'

import { useState } from 'react'
import { addPost } from '../actions'

// Client Component
// useClient
// useServer
// serverAction
// formAction
// revalidatePath
// revalidateTag

export default function AddPostForm() {
    const [message, setMessage] = useState('')

    async function handleSubmit(formData: FormData) {
        try {
            await addPost(formData)
            setMessage('Post added successfully!')
        } catch {
            setMessage('Failed to add post.')
        }
    }

    return (
        <form action={handleSubmit}>
            <h2>Add Post</h2>

            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                />
            </div>

            <div>
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    name="body"
                    required
                />
            </div>

            <button type="submit">Add Post</button>

            {message && <p>{message}</p>}
        </form>
    )
}