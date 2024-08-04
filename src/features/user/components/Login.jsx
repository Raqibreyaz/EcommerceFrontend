import React, { useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { FormError, Loader, Container } from '../../../components/index.js'
import { useFetchUserQuery, useLoginUserMutation } from '../userSlice.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'

function Login() {

  const methods = useForm()
  const { register, handleSubmit, formState: { isSubmitting } } = methods

  const [LoginUser, { isLoading, isSuccess }] = useLoginUserMutation()

  const { refetch } = useFetchUserQuery()

  const HandleLogin = useCallback(
    (data) => {
      catchAndShowMessage(LoginUser, data)
    },
    [],
  )
  const Location = useLocation()
  const Navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {

      refetch()
      const from = Location.state?.from || '/'
      Navigate('/')
    }
  }, [isSuccess])

  return (
    <Container
      LoadingConditions={[!!isLoading]}
    >
      <div className="bg-gray-100 flex flex-col justify-center  sm:px-6 lg:px-8 py-10">
        <div className="sm:mx-auto mt-5 sm:w-full sm:max-w-md">
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 mx-2">
              create an account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(HandleLogin)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input id="email" {...register('email', { required: "email is required" })} type="email" autoComplete="email"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address" />
                  </div>
                  <FormError field={'email'} />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input id="password" {...register('password', { required: "password is required" })} type="password" autoComplete="current-password"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password" />
                  </div>
                  <FormError field={'password'} />
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in
                  </button>
                </div>
              </form>
            </FormProvider>
            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm mb-2">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div>
                <Link to="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                    alt="" />Google
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login


