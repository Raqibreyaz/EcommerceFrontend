import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catchAsyncError, wrapper } from '../../utils/catchErrorAndWrapper.js'
import { loginUser, fetchUser, logoutUser, signUpUser, editUserProfile, addNewAddress, changeUserAvatar, fetchProductOwners, fetchProfileDetails } from "./userApi.js";
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
            if (!action.type.includes('fetch') && !action.type.includes('product-owners'))
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
            // if (!action.type.includes('fetchUser') && !action.type.includes('product-owners'))
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
    changeUserAvatarAsync,
    fetchProductOwnersAsync,
    fetchProfileDetailsAsync
}

export default userSlice.reducer;