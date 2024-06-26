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