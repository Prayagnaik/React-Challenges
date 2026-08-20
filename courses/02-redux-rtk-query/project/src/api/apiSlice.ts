import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi, type User, type Post } from './mockServer'

export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),

    tagTypes: ['User', 'Post'],

    endpoints: (builder) => ({
        // Challenge 07
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

        // Challenge 08 / 11
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

        // Challenge 13
        getPostById: builder.query<Post, number>({
            queryFn: async (id) => {
                const post = await mockApi.getPostById(id)

                return { data: post }
            },

            providesTags: (result, error, id) => [
                { type: 'Post' as const, id },
            ],
        }),

        // Challenge 09 / 10
        addPost: builder.mutation<Post, Omit<Post, 'id'>>({
            queryFn: async (post) => {
                const newPost = await mockApi.createPost(post)

                return { data: newPost }
            },

            invalidatesTags: [{ type: 'Post', id: 'LIST' }],

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getPosts',
                        undefined,
                        (draft) => {
                            draft.push({
                                ...arg,
                                id: Date.now(),
                            })
                        },
                    ),
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetPostsQuery,
    useGetPostByIdQuery,
    useAddPostMutation,
} = apiSlice