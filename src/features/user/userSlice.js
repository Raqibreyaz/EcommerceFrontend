import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catchAsyncError } from '../../catchAsyncError/catchAsyncError.js'
import { loginUser, fetchUser, logoutUser, signUpUser, editUserProfile, addNewAddress, changeUserAvatar } from "./userApi.js";

const initialState = {
    userData: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    success: ''
};

const loginUserAsync = createAsyncThunk('user/login', async (data) => {
    const [error, result] = await catchAsyncError(loginUser, data)
    if (error) {
        throw new Error(error.response.data.message)
    }
    return result.data
})

const signUpUserAsync = createAsyncThunk('user/signup', async (data) => {
    const [error, result] = await catchAsyncError(signUpUser, data)
    if (error)
        throw new Error(error.response.data.message)
    return result.data
})

const editUserProfileAsync = createAsyncThunk('user/edit-profile', async (data) => {

    const [error, result] = await catchAsyncError(editUserProfile, data)

    if (error)
        throw new Error(error.response.data.message)

    return result.data
}
)

const changeUserAvatarAsync = createAsyncThunk('user/change-avatar', async (data) => {
    const [error, result] = await catchAsyncError(changeUserAvatar, data)
    if (error)
        throw new Error(error.response.data.message)
    return result.data
}
)

const addNewAddressAsync = createAsyncThunk('user/add-new-address', async (data) => {
    const [error, result] = await catchAsyncError(addNewAddress, data)
    if (error)
        throw new Error(error.response.data.message)
    return result.data
}
)

const fetchUserAsync = createAsyncThunk("user/fetchUser", async () => {
    const [error, result] = await catchAsyncError(fetchUser)
    if (error)
        throw new Error(error.response.data.message)

    return result.data
});

const logoutUserAsync = createAsyncThunk('user/logout', async () => {
    const [error, result] = await catchAsyncError(logoutUser)
    if (error)
        throw new Error(error.response.data.message)
    return result.data
}
)

const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.error = null
            state.success = action.payload.message

            if (action.type === 'user/login/fullfilled') {
            }
            if (action.type === 'user/fetchUser/fulfilled') {
                state.userData = action.payload.user
                state.isAuthenticated = true
                console.log(state.userData);
            }
            if (action.type === 'user/signup/fulfilled') {
            }
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.type === 'user/fetchUser/rejected' ? '' : action.error.message;
            state.success = ''
        });
};

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        clearError(state) {
            state.error = ''
        },
        clearSuccess(state) {
            state.success = ''
        }
    },
    extraReducers: (builder) => {
        handleAsyncActions(builder, loginUserAsync)
        handleAsyncActions(builder, fetchUserAsync)
        handleAsyncActions(builder, signUpUserAsync)
        handleAsyncActions(builder, logoutUserAsync)
    }
})

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