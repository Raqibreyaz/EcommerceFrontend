import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FormError, FailedMessage, SuccessMessage } from '../../../components/index.js'
import { loginUserAsync, clearError, clearSuccess } from '../userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Login() {

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const dispatch = useDispatch()
  const error = useSelector(state => state.user.error)
  const success = useSelector(state => state.user.success)
  const Navigate = useNavigate()

  if (error) {
    FailedMessage(error)
      .then(() => dispatch(clearError()))
  }

  if (success) {

    SuccessMessage(success)
      .then(() => {
        dispatch(clearSuccess())
        Navigate('/')
      })
  }

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUserAsync(data))
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create an account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input id="email" {...register('email', { required: true })} type="email" autoComplete="email"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address" />
                </div>
                <FormError error={errors} field={'email'} />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input id="password" {...register('password', { required: true })} type="password" autoComplete="current-password"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password" />
                </div>
                <FormError error={errors} field={'password'} />
              </div>
              <div className="text-sm">
                <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
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
            <div className="mt-6">
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login


