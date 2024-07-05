import { useCallback } from "react"
import { useSelector } from "react-redux"
import {
    loginUserAsync, signUpUserAsync, clearError, clearSuccess, fetchProductOwnersAsync, fetchUserAsync, fetchProfileDetailsAsync, changeUserAvatarAsync, removeAddressAsync, editUserProfileAsync
} from "../features/user/userSlice"
import { useMessageAndClear } from "./useMessageAndClear"
import { useNavigate } from "react-router-dom"

export const useUser = () => {

    const executeAndMessage = useMessageAndClear('user', clearError, clearSuccess)

    const { userData: user, status: userStatus, productOwners, isAuthenticated, userProfileDetails } = useSelector(state => state.user)

    const Navigate = useNavigate()

    const HandleFetchUser = useCallback(
        () => {
            executeAndMessage(fetchUserAsync)          
        },
        [],
    )

    const HandleLogin = useCallback(
        (data) => {
            executeAndMessage(loginUserAsync, data, () => Navigate('/'))
        },
        []
    )
    const HandleSignup = useCallback(
        (data) => {
            executeAndMessage(signUpUserAsync, data, () => Navigate('/'))
        },
        []
    )
    const HandleEditUser = useCallback(
        (data) => {
            console.log(data);
            executeAndMessage(editUserProfileAsync, data, () => HandleFetchUser())
        },
        [],
    )
    const HandleProductOwners = useCallback(
        () => {
            executeAndMessage(fetchProductOwnersAsync)
        },
        [],
    )

    const HandleFetchProfileDetails = useCallback(
        (userId) => {
            executeAndMessage(fetchProfileDetailsAsync, userId)
        },
        [],
    )
    const HandleRemoveAddress = useCallback(
        (addressId) => {
            executeAndMessage(removeAddressAsync, addressId, () => HandleFetchUser())
        },
        []
    )

    const HandleChangeUserAvatar = useCallback(
        (data) => {
            for (const [key, value] of data.entries()) {
                console.log(key, value);
            }
            executeAndMessage(changeUserAvatarAsync, data)
        },
        [],
    )

    return { productOwners, user, userStatus, isAuthenticated, HandleFetchUser, HandleProductOwners, HandleLogin, HandleSignup, HandleEditUser, HandleFetchProfileDetails, HandleChangeUserAvatar, HandleRemoveAddress, userProfileDetails }
}
