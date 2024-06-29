import { createAsyncThunk } from "@reduxjs/toolkit"

export const catchAsyncError = async (fn, ...rest) => {
    try {
        let result = await fn(...rest)
        return [null, result]
    } catch (error) {
        return [error, null]
    }
}

export function wrapper(prefix, actionFunction) {
    return createAsyncThunk(prefix, async (data = '') => {
        const [error, result] = await catchAsyncError(actionFunction, data)
        if (error) {
            throw new Error(error.response.data.message)
        }
        return result.data
    })
}