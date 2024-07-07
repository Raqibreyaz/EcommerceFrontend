import { FailedMessage, SuccessMessage } from "../components/MessageDialog"

export const catchAndShowMessage = async (fn, data) => {
    try {
        let result = await fn(data)
        SuccessMessage(result.message)
    } catch (error) {
        FailedMessage(error.message)
    }
}


