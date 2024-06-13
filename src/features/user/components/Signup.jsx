import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormError from '../../../components/FormError'
import { signUpUserAsync } from '../userSlice'
import { useDispatch, useSelector } from 'react-redux'
import MessageDialog from '../../../components/MessageDialog'

// fullNAME  email phone avatar password address

function Signup() {

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const dispatch = useDispatch()
  const error = useSelector(state => state.user.error)
  const success = useSelector(state => state.user.success)
  const [preview, setPreview] = useState('')
  const Navigate = useNavigate()

  const onSubmit = (data) => {

    console.log(data);

    const formData = new FormData()

    const address = {}

    for (const key in data) {

      if (Object.hasOwnProperty.call(data, key)) {

        const element = data[key];

        if (key === 'state' || key === 'city' || key === 'house_no' || key === 'pincode')
          address[key] = element
        else
          formData.append(key, element instanceof FileList ? element[0] : element)
      }
    }

    formData.append('address', address)

    dispatch(signUpUserAsync(formData))

    if (success)
      Navigate('/')
  }

  const handlePreview = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]))
  }


  return (
    <>
      {error && <MessageDialog head={error} />}
      {success && <MessageDialog head={success} buttonMessage='okay' className='bg-green-500' />}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
              login to existing account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* avatar */}
              <div>
                <div className='size-[25vmin] border mx-auto mb-3 rounded-full overflow-hidden'>
                  <img src={preview} alt="" className='w-full h-full' />
                </div>
                <label htmlFor="avatar" className='text-gray-600 font-semibold'>Avatar: </label>
                <input type="file" id='avatar' {...register('avatar', { required: true })} onChange={(e) => handlePreview(e)} />
              </div>
              {/* fullname */}
              <div>
                <label htmlFor="fullname" className='font-semibold text-gray-600'>FullName</label>
                <input type="text" id='fullname' {...register('fullname', { required: true })} className='block border rounded p-2 w-full' />
                <FormError error={errors} field={'fullname'} />
              </div>
              {/* email */}
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
              {/* password */}
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
              {/* phone */}
              <div>
                <label htmlFor="phone">Phone No: </label>
                <input type="text" id='phone' {...register('phoneNo', { required: true })} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                <FormError error={errors} field={'phoneNo'} />
              </div>
              {/* address */}
              <div>
                <label htmlFor="state">state: </label>
                <input {...register('state', { required: true })} type="text" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                <FormError error={errors} field={'state'} />
              </div>
              <div>
                <label htmlFor="city">city: </label>
                <input {...register('city', { required: true })} type="text" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                <FormError error={errors} field={'state'} />
              </div>
              <div>
                <label htmlFor="pincode">pincode: </label>
                <input {...register('pincode', { required: true })} type="number" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                <FormError error={errors} field={'state'} />
              </div>
              <div>
                <label htmlFor="house_no">house_no: </label>
                <input {...register('house_no', { required: true })} type="text" className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                <FormError error={errors} field={'state'} />
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300">
                  </div>
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
        </div >
      </div >
    </>
  )
}

export default Signup


