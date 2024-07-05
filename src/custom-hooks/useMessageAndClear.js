import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { FailedMessage, SuccessMessage } from "../components/MessageDialog";

export const useMessageAndClear = (sliceName, clearError, clearSuccess, showError) => {

    const dispatch = useDispatch()
    const { error, success } = useSelector(state => state[sliceName])

    if (error) {
        FailedMessage(error)
            .then(() => dispatch(clearError()))
    }

    if (success) {
        SuccessMessage(success)
            .then(() => dispatch(clearSuccess()))
    }

    // the callBack is a function which we have to call when we successfully done our work
    return useCallback((asyncThunk, data = null, callBack = null) => {
        dispatch(asyncThunk(data))
            .unwrap()
            .then(() => { if (callBack) callBack() })
            .catch((error) => { })
    }, [])
}
