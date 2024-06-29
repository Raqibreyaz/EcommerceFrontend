import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catchAsyncError, wrapper } from '../../utils/catchErrorAndWrapper.js'
import { loginUser, fetchUser, logoutUser, signUpUser, editUserProfile, addNewAddress, changeUserAvatar, fetchProductOwners } from "./userApi.js";
import { clearErrorAndSuccess } from "../../utils/Generics.js";

const initialState = {
    userData: null,
    productOwners: [],
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

export const fetchProductOwnersAsync = wrapper('user/product-owners', fetchProductOwners)

const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
            state.success = ''
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.success = action.payload.message
            console.log(action);

            if (action.type === 'user/fetchUser/fulfilled') {
                state.userData = action.payload.user
                state.isAuthenticated = true
            }
            if (action.type === 'user/product-owners/fulfilled') {
                state.productOwners = action.payload.productOwners
                console.log(action.payload);
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
        handleAsyncActions(builder, changeUserAvatarAsync)
        handleAsyncActions(builder, editUserProfileAsync)
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
    changeUserAvatarAsync
}

export default userSlice.reducer;