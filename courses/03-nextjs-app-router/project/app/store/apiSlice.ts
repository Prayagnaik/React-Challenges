import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query API slice
// createApi: Creates the RTK Query API.
// fetchBaseQuery: Performs HTTP requests.
// apiSlice: Centralized API data fetching and caching.
// generatedHooks: RTK Query generates hooks for Client Components.
//useQuery, useMutation

type Post = {
    id: number;
    title: string;
    body: string;
};

export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),

    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => "api/posts",
        }),
    }),
});

// generated query hook
// useGetPostsQuery: Fetches posts using RTK Query.
export const { useGetPostsQuery } = apiSlice;