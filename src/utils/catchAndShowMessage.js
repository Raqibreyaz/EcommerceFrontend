import { FailedMessage, SuccessMessage } from "../components/MessageDialog"

export const catchAndShowMessage = async (fn, data = {}) => {
    try {
        let result = await fn(data).unwrap()
        console.log(result);
        SuccessMessage(result.message)
    } catch (error) {
        FailedMessage(error.error || error.response.data.message)
    }
}


