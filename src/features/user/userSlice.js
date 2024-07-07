import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { catchAsyncError, wrapper } from '../../utils/catchErrorAndWrapper.js'
import { loginUser, fetchUser, logoutUser, signUpUser, editUserProfile, addNewAddress, changeUserAvatar, fetchProductOwners, fetchProfileDetails, removeAddress } from "./userApi.js";
import { clearErrorAndSuccess } from "../../utils/Generics.js";

const initialState = {
  userData: null,
  productOwners: [],
  userProfileDetails: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  success: ''
};

const loginUserAsync = wrapper('user/login', loginUser)

const signUpUserAsync = wrapper('user/signup', signUpUser)

const editUserProfileAsync = wrapper('user/edit-profile', editUserProfile)

const fetchUserAsync = wrapper("user/fetchUser", fetchUser)

const changeUserAvatarAsync = wrapper('user/change-avatar', changeUserAvatar)

const addNewAddressAsync = wrapper('user/add-new-address', addNewAddress)

const removeAddressAsync = wrapper('user/remove-address', removeAddress)

const logoutUserAsync = wrapper('user/logout', logoutUser)

const fetchProductOwnersAsync = wrapper('user/fetchProductOwners', fetchProductOwners)

const fetchProfileDetailsAsync = wrapper('user/fetchProfileDetails', fetchProfileDetails)

const handleAsyncActions = (builder, asyncThunk) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null
      state.success = ''
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.status = 'idle';
      if (!action.type.includes('fetch'))
        state.success = action.payload.message

      if (action.type === 'user/fetchUser/fulfilled') {
        state.userData = action.payload.user
        state.isAuthenticated = true
      }

      if (action.type === 'user/fetchProductOwners/fulfilled') {
        state.productOwners = action.payload.productOwners
      }

      if (action.type.includes('fetchProfileDetails')) {
        state.userProfileDetails = action.payload.profileDetails
      }
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    ...clearErrorAndSuccess
  },
  extraReducers: (builder) => {
    handleAsyncActions(builder, loginUserAsync)
    handleAsyncActions(builder, fetchUserAsync)
    handleAsyncActions(builder, signUpUserAsync)
    handleAsyncActions(builder, logoutUserAsync)
    handleAsyncActions(builder, fetchProductOwnersAsync)
    handleAsyncActions(builder, addNewAddressAsync)
    handleAsyncActions(builder, removeAddressAsync)
    handleAsyncActions(builder, changeUserAvatarAsync)
    handleAsyncActions(builder, editUserProfileAsync)
    handleAsyncActions(builder, fetchProfileDetailsAsync)
  }
})

export const { clearError, clearSuccess } = userSlice.actions

export {
  fetchUserAsync,
  loginUserAsync,
  signUpUserAsync,
  logoutUserAsync,
  editUserProfileAsync,
  addNewAddressAsync,
  removeAddressAsync,
  changeUserAvatarAsync,
  fetchProductOwnersAsync,
  fetchProfileDetailsAsync
}

export default userSlice.reducer;

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
        headers: {
          'Content-Type': 'application/json',
        },
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
      providesTags: ['Profile'],
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
