import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/users/',
        credentials: 'include',
    }),

    reducerPath: 'dashboardApi',

    tagTypes: ['DashBoard','Orders'],

    endpoints: (build) => ({
        fetchDashboard: build.query({
            query: () => ({
                url: 'dashboard',
                method: "GET",
            }),
            providesTags: ['DashBoard']
        }),
    }),
});

export default dashboardApi

export const { useFetchDashboardQuery } = dashboardApi