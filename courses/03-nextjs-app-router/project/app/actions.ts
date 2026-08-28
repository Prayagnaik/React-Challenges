'use server'

import { revalidatePath } from 'next/cache'

// Server Action
// useServer
// revalidatePath
// revalidateTag
// serverAction

export async function addPost(formData: FormData) {
    const title = formData.get('title')
    const body = formData.get('body')

    if (!title || !body) {
        throw new Error('Title and body are required')
    }

    // Server-side mutation would happen here.
    // For this challenge, we demonstrate the Server Action
    // and revalidate the posts route after the mutation.

    revalidatePath('/posts')
}