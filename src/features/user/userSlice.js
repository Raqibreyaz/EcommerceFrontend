import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/v1/users/',
  }),
  reducerPath: 'userApi',
  tagTypes: ['User', 'Profile', 'ProductOwners', 'Address'],
  endpoints: (build) => ({

    fetchUser: build.query({
      query: () => ({
        url: 'fetch-user',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),

    signUpUser: build.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    editUserProfile: build.mutation({
      query: (data) => ({
        url: 'edit-profile',
        method: 'PUT',
        body: data,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    changeUserAvatar: build.mutation({
      query: (data) => ({
        url: 'edit-profile/avatar',
        method: 'PATCH',
        body: data, // FormData, browser handles multipart/form-data
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    addNewAddress: build.mutation({
      query: (data) => ({
        url: 'edit-profile/address',
        method: 'PATCH',
        body: { address: data },
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    fetchProductOwners: build.query({
      query: () => ({
        url: 'get-product-owners',
        method: 'GET',
        credentials: 'omit',
      }),
      providesTags: ['ProductOwners'],
    }),

    fetchProfileDetails: build.query({
      query: (id) => ({
        url: `get-profile-details/${id}`,
        method: 'GET',
        credentials: 'omit',
      }),
      providesTags: (result, error, id) => [{ type: 'Profile', id }],
    }),

    removeAddress: build.mutation({
      query: (addressId) => ({
        url: `remove-address/${addressId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Address', 'User'],
    }),
  }),


});

export const {
  useFetchUserQuery,
  useSignUpUserMutation,
  useEditUserProfileMutation,
  useChangeUserAvatarMutation,
  useAddNewAddressMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useFetchProductOwnersQuery,
  useFetchProfileDetailsQuery,
  useRemoveAddressMutation,
} = userApi;
