import React, { memo, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import { Container, FormError } from '../../../components/index.js'
import { useChangeUserRoleMutation, useFindUserMutation } from '../dashboardSlice.js';


const ChildComponent = memo(({ user, setUser }) => {

  const { handleSubmit, register, formState: { isDirty }, reset } = useForm({
    defaultValues: { role: user?.role || '' }
  })

  const [ChangeRole, { isLoading: isChangingRole }] = useChangeUserRoleMutation()

  const onSubmit = useCallback((data) => {
    catchAndShowMessage(ChangeRole, {
      role: data.role,
      email: user.email
    })
    setUser(null)
  }, [user])

  return (
    <div>
      <Container
        className='mt-3'
        RenderingConditions={[!!user]}
      >
        <div>
          <h1 className='font-semibold  block mr-2 capitalize'>user found: </h1>
          <p className="top-0 left-0 text-sm text-gray-500 mt-1 inline-block">
            <span className='text-black'>Name</span> : {user?.fullname || ''}
          </p>
        </div>
      </Container>
      <Container
        className='mt-6'
        RenderingConditions={[!!user]}
        LoadingConditions={[!!isChangingRole]}
      >
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register('role')}
        >
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="customer">Customer</option>
        </select>
        {
          isDirty && <button
            type='button'
            className='border bg-green-500 rounded-md p-2 text-white capitalize font-semibold mt-2 text-sm'
            onClick={handleSubmit(onSubmit)}
          >
            confirm role
          </button>
        }
      </Container>
    </div >
  )
})

const ChangeRole = () => {

  const [FindUser, { isLoading: isFindingUser }] = useFindUserMutation()

  const [user, setUser] = useState(null)

  const methods = useForm();

  const { register, handleSubmit } = methods

  const onSubmit = useCallback(async (data) => {
    let { user: fetchedUser } = await catchAndShowMessage(FindUser, data, false) ?? {}
    console.log(fetchedUser);
    setUser(fetchedUser)
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <FormError field={'email'} />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isFindingUser}
          >
            {isFindingUser ? 'Loading...' : 'Find User'}
          </button>
        </form>
      </FormProvider>
      {user && <ChildComponent user={user} setUser={setUser} getValues={methods.getValues} />}
    </div>
  );
};

export default ChangeRole;
