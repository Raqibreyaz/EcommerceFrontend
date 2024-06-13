export const catchAsyncError = async (fn, ...rest) => {
    try {
        let result = await fn(...rest)
        return [null, result]
    } catch (error) {
        return [error, null]
    }
}