import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/users/`,
  }),
  reducerPath: "userApi",
  tagTypes: ["User", "Profile", "ProductOwners", "Address"],
  keepUnusedDataFor: import.meta.env.VITE_CACHE_VALIDITY,
  endpoints: (build) => ({
    fetchUser: build.query({
      query: () => ({
        url: "fetch-user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    signUpUser: build.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    editUserProfile: build.mutation({
      query: (data) => ({
        url: "edit-profile",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),

    changeUserAvatar: build.mutation({
      query: (data) => ({
        url: "edit-profile/avatar",
        method: "PATCH",
        body: data, // FormData, browser handles multipart/form-data
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    addNewAddress: build.mutation({
      query: (data) => ({
        url: "edit-profile/address",
        method: "PATCH",
        body: { address: data },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    forgotPassword: build.mutation({
      query: (data) => ({
        url: "forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyPasswordResetToken: build.mutation({
      query: (data) => ({
        url: "verify-reset-token",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "PATCH",
        body: data,
      }),
    }),

    fetchProductOwners: build.query({
      query: () => ({
        url: "get-product-owners",
        method: "GET",
        credentials: "omit",
      }),
      providesTags: ["ProductOwners"],
    }),

    fetchProfileDetails: build.query({
      query: (id) => ({
        url: `get-profile-details/${id}`,
        method: "GET",
        credentials: "omit",
      }),
      providesTags: (result, error, id) => [{ type: "Profile", id }],
    }),

    removeAddress: build.mutation({
      query: (addressId) => ({
        url: `remove-address/${addressId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Address", "User"],
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyPasswordResetTokenMutation,
} = userApi;
