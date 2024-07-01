import axios from "axios"

export const clearErrorAndSuccess = {
    clearError: (state, action) => {
        state.error = null
    },
    clearSuccess: (state, action) => {
        state.success = ''
    }
}

export const makeRequest = async ({ method, url, data = {}, withCredentials = true, headers = {} }) => {

    const reqObj = { method, url: `http://localhost:4000/api/v1${url}`, withCredentials }

    if (Object.keys(data).length)
        reqObj.data = data
    if (Object.keys(headers).length)
        reqObj.headers = headers

    return await axios(reqObj);
}

