import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { FailedMessage, SuccessMessage } from '../../../components/index.js'


function AddCategory() {

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

    const dispatch = useDispatch()

    const onAddCategory = (data) => {

        if (!data.newCategory)
            return;

        dispatch(addNewCategoryAsync(data.newCategory))
    }

    return (
        <form className='flex flex-col gap-2'>
            <label htmlFor="add-category" className='font-semibold'>Add a Category:</label>
            <input type="text" {...register('newCategory',)} className='rounded p-2 focus:border-blue-500' id='add-category' />
            <button type='button' disabled={isSubmitting} onClick={handleSubmit(onAddCategory)} className='bg-blue-500 py-1 rounded text-white'>Add Category</button>
        </form>
    )
}

export default AddCategory
