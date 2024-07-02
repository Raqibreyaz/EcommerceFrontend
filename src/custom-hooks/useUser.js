import { useCallback } from "react"
import { useSelector } from "react-redux"
import { loginUserAsync, signUpUserAsync, clearError, clearSuccess, fetchProductOwnersAsync, fetchUserAsync } from "../features/user/userSlice"
import { useMessageAndClear } from "./useMessageAndClear"
import { useNavigate } from "react-router-dom"

export const useUser = () => {

    const executeAndMessage = useMessageAndClear('user', clearError, clearSuccess)

    const { userData: user, status: userStatus, productOwners, isAuthenticated } = useSelector(state => state.user)

    const Navigate = useNavigate()

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
            // executeAndMessage()
            console.log(data);
        },
        [],
    )

    const HandleProductOwners = useCallback(
        () => {
            executeAndMessage(fetchProductOwnersAsync)
        },
        [],
    )
    const HandleFetchUser = useCallback(
        () => {
            executeAndMessage(fetchUserAsync)
        },
        [],
    )

    return { productOwners, user, userStatus, isAuthenticated, HandleFetchUser, HandleProductOwners, HandleLogin, HandleSignup, HandleEditUser }
}
