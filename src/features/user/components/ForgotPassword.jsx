import React, { useCallback } from 'react'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage'
import { FormProvider, useForm } from 'react-hook-form'
import UserFinder from '../sub-components/UserFinder'
import { useForgotPasswordMutation } from '../userSlice'

const ForgotPassword = () => {

    const [ForgotUserPassword, { isLoading }] = useForgotPasswordMutation()

    const onSubmit = useCallback((data) => {
        console.log(data);
        
        catchAndShowMessage(ForgotUserPassword, data)
    }, [])

    const methods = useForm()

    return (
        <FormProvider {...methods}>
            <UserFinder btnText={'reset password'} isLoading={isLoading} onSubmit={onSubmit}/>
        </FormProvider>
    )
}

export default ForgotPassword
