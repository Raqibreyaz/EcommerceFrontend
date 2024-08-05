import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/dashboard/',
        credentials: 'include',
    }),

    reducerPath: 'dashboardApi',

    tagTypes: ['DashBoard', 'Sellers', 'Messages','FetchedUser'],

    endpoints: (build) => ({
        fetchDashboard: build.query({
            query: () => ({
                url: '',
                method: "GET",
            }),
            providesTags: ['DashBoard']
        }),

        fetchSellers: build.query({
            query: () => ({
                url: 'get-sellers',
                method: 'GET'
            }),
            providesTags: ['Sellers']
        }),

        fetchMessages: build.query({
            query: (query = '') => ({
                url: `messages/get-messages?${query}`,
                method: 'GET'
            }),
            providesTags: ['Messages']
        }),

        createMessage: build.mutation({
            query: (data) => ({
                url: 'messages/create-message',
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Messages']
        }),

        findUser: build.mutation({
            query: (data) => ({
                url: '/find-user',
                body: data,
                method: "POST",
                headers: { 'Content-Type': 'application/json' }
            }),
            providesTags: (result, error, data) => [{ type: 'FetchedUser', id: data.email }]
        }),

        changeUserRole: build.mutation({
            query: (data) => ({
                url: `/change-user-role`,
                body: data,
                method: "PUT",
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: (result, error, { email }) => [{ type: 'FetchedUser', id: email }]
        })
    }),
});

export default dashboardApi

export const {
    useFetchDashboardQuery,
    useCreateMessageMutation,
    useFetchMessagesQuery,
    useFetchSellersQuery,
    useFindUserMutation,
    useChangeUserRoleMutation
} = dashboardApi