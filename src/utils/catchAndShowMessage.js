import { FailedMessage, SuccessMessage } from "../components/MessageDialog"

export const catchAndShowMessage = async (fn, data = {}) => {
    try {
        let result = await fn(data).unwrap()
        SuccessMessage(result.message)
    } catch (error) {
        FailedMessage(error.error)
    }
}


