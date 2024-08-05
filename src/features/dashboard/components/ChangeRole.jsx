import React, { memo, useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import { Container, FormError } from '../../../components/index.js'
import { useChangeUserRoleMutation, useFindUserMutation } from '../dashboardSlice.js';
import UserFinder from '../../user/sub-components/UserFinder.jsx';

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

  const onSubmit = useCallback(async (data) => {
    let { user: fetchedUser } = await catchAndShowMessage(FindUser, data, false) ?? {}
    setUser(fetchedUser)
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <FormProvider {...methods}>
        <UserFinder
          btnText='finding user'
          isLoading={isFindingUser}
          onSubmit={onSubmit}
          disabledBtn={isFindingUser} />
      </FormProvider>
      {user && <ChildComponent user={user} setUser={setUser} getValues={methods.getValues} />}
    </div>
  );
};

export default ChangeRole;
