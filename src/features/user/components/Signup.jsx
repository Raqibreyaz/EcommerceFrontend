import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFetchUserQuery, useSignUpUserMutation } from '../userSlice.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'
import FormError from '../../../components/FormError.jsx'
import Container from '../../../components/Container.jsx'
import { useFetchUserCartQuery } from '../../cart/cartSlice.js'


function Signup() {

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const [SignupUser, { isLoading, isSuccess }] = useSignUpUserMutation()

  const { refetch } = useFetchUserQuery()

  const onSubmit = useCallback((data) => {

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

    formData.append('address', JSON.stringify(address))

    catchAndShowMessage(SignupUser, formData)
  }, [])

  const [preview, setPreview] = useState('')

  const handlePreview = useCallback((e) => {
    setPreview(URL.createObjectURL(e.target.files[0]))
  }, [])

  const Location = useLocation()
  const Navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      refetch()
      const from = Location.state?.from || '/'
      Navigate(from)
    }
  }, [isSuccess])


  return (
    <Container
      LoadingConditions={[isLoading]}
    >
      < div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" >
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
                <input type="file" id='avatar'  accept="image/*" {...register('avatar', { required: true })} onChange={(e) => handlePreview(e)} />
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
          </div>
        </div >
      </div >
    </Container>
  )
}

export default Signup


