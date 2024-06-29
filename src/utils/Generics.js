import axios from "axios";

export const clearErrorAndSuccess = {
    clearError: (state, action) => {
        state.error = null
        console.log('error cleared');
    },
    clearSuccess: (state, action) => {
        state.success = ''
        console.log('success cleared');
    }
}

export const makeRequest = async (method, url, data = {}, withCredentials = true, headers = {}) => {

    const reqObj = { method, url: `http://localhost:4000/api/v1${url}`, withCredentials }

    if (Object.keys(data))
        reqObj.data = data
    if (Object.keys(headers))
        reqObj.headers = headers

    return await axios(reqObj);
}
