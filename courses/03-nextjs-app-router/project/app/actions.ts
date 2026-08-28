'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

// Server Action
// useServer
// serverAction
// revalidation
// fetchCache
// revalidatePath
// revalidateTag

export async function addPost(formData: FormData) {
    const title = formData.get('title')
    const body = formData.get('body')

    if (typeof title !== 'string' || typeof body !== 'string') {
        throw new Error('Invalid post data')
    }

    if (!title.trim() || !body.trim()) {
        throw new Error('Title and body are required')
    }

    // Mutation would happen here.
    // Revalidate cached data after the mutation.
    revalidatePath('/posts')
    revalidateTag('posts')

    return {
        success: true,
        title,
        body,
    }
}