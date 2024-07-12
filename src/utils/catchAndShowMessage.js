import { FailedMessage, SuccessMessage } from "../components/MessageDialog"

export const catchAndShowMessage = async (fn, data = {}, showSuccess = true) => {
    try {
        let result = await fn(data).unwrap()

        if (showSuccess)
            SuccessMessage(result.data.message)
        else
            return result.data
    } catch (error) {
        FailedMessage(error.error || error.response.data.message)
        return undefined
    }
}


