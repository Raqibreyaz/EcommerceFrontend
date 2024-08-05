import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { FormError, Container } from '../../../components/index.js'
import { useEditUserProfileMutation, useFetchUserQuery } from '../userSlice.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'

function EditProfile() {

    const { data: { user } = {}, isLoading: isLoadingUser } = useFetchUserQuery()
    const [EditUser, { isLoading: isEditingUser, isSuccess: isSuccessEditingUser }] = useEditUserProfileMutation()

    const methods = useForm()

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = methods

    const Navigate = useNavigate()

    const onSubmit = useCallback(
        (data) => {
            catchAndShowMessage(EditUser, data)
        },
        [],
    )

    useEffect(() => {
        if (user) {
            methods.reset({
                email: user.email,
                password: '',
                newPassword: '',
                phoneNo: user.phoneNo,
                fullname: user.fullname

            })
        }
    }, [user])

    useEffect(() => {

        if (isSuccessEditingUser)
            Navigate('/profile')
    }, [isSuccessEditingUser])


    return (
        <Container
            LoadingConditions={[isEditingUser, isLoadingUser]}
        >
            <div className="max-w-2xl mx-auto bg-white p-8">
                <h1 className='mb-10 font-semibold text-xl'>Edit Profile</h1>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            [
                                {
                                    type: 'email',
                                    name: 'email',
                                    cond: { required: "email is required!!" },
                                    child: "email address",
                                    id: 1
                                },
                                {
                                    type: 'password',
                                    name: 'password',
                                    cond: { required: "password is required!!" },
                                    child: 'password',
                                    id: 2
                                },
                                {
                                    type: 'password',
                                    name: 'newPassword',
                                    cond: {},
                                    child: 'new password',
                                    id: 3
                                },
                                {
                                    type: 'text',
                                    name: 'fullname',
                                    cond: { required: "fullname is required!!" },
                                    child: 'fullname',
                                    id: 4
                                },
                                {
                                    type: 'text',
                                    name: 'phoneNo',
                                    cond: { required: "phone no is required", minLength: 10 },
                                    child: 'phone no',
                                    id: 5
                                },
                            ].map((input, index) => (
                                <div key={input.id} className="relative z-0 mb-6 w-full group">
                                    <input
                                        type={input.type}
                                        id={input.name}
                                        {...register(input.name, input.cond)}
                                        className="block pt-5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 z-10 peer"
                                    />
                                    <label
                                        htmlFor={input.name}
                                        className="absolute max-sm:text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize font-semibold text-xl"
                                    >
                                        {input.child}{input.child === 'new password' ? '(optional)' : ''}
                                    </label>
                                    <FormError field={input.name} />
                                </div>
                            ))
                        }
                        <button
                            disabled={Object.keys(errors).length > 0 || isSubmitting}
                            type="submit"
                            className={`${isDirty ? '' : 'hidden'} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        >
                            Submit
                        </button>
                    </form>
                </FormProvider>
            </div>
        </Container>
    )
}

export default EditProfile
