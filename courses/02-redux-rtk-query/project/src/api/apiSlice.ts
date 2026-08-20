import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi, type User, type Post } from './mockServer'

export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),

    tagTypes: ['User', 'Post'],

    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            queryFn: async () => {
                const users = await mockApi.getUsers()

                return { data: users }
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'User' as const,
                            id,
                        })),
                        { type: 'User' as const, id: 'LIST' },
                    ]
                    : [{ type: 'User' as const, id: 'LIST' }],
        }),

        getPosts: builder.query<Post[], void>({
            queryFn: async () => {
                const posts = await mockApi.getPosts()

                return { data: posts }
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Post' as const,
                            id,
                        })),
                        { type: 'Post' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Post' as const, id: 'LIST' }],
        }),

        addPost: builder.mutation<Post, Omit<Post, 'id'>>({
            queryFn: async (post) => {
                const newPost = await mockApi.createPost(post)

                return { data: newPost }
            },

            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetPostsQuery,
    useAddPostMutation,
} = apiSlice