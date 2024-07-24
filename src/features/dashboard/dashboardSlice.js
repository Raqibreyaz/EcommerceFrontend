import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/dashboard/',
        credentials: 'include',
    }),

    reducerPath: 'dashboardApi',

    tagTypes: ['DashBoard', 'Sellers', 'Messages'],

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
                url: `messages?${query}`,
                method: 'GET'
            }),
            providesTags: ['Messages']
        }),

        createMessage: build.mutation({
            query: (data) => ({
                url: 'create-message',
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Messages']
        })
    }),
});

export default dashboardApi

export const { 
    useFetchDashboardQuery ,
    useCreateMessageMutation,
    useFetchMessagesQuery,
    useFetchSellersQuery,
} = dashboardApi