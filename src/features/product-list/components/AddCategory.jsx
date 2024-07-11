import React, { useState, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogPanel, Menu, MenuItem, MenuItems, MenuButton, Transition, TransitionChild, Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Container, FailedMessage, SuccessMessage } from '../../../components/index.js'

function AddCategory() {

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

    const dispatch = useDispatch()

    const onAddCategory = (data) => {

        if (!data.newCategory)
            return;

        // dispatch(addNewCategoryAsync(data.newCategory))
    }

    const [open, setOpen] = useState(false)

    return (
        <Container>
            {/* < Transition show={open} as={Fragment}> */}
                {/* <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild> */}

                    <div className="fixed inset-0 z-40 flex">
                        {/* <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        > */}
                            {/* <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"> */}
                                {/* <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div> */}

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200 sticky top-0">
                                    <h3 className="sr-only">Categories</h3>
                                    <form className='flex flex-col gap-2'>
                                        <label htmlFor="add-category" className='font-semibold'>Add a Category:</label>
                                        <input type="text" {...register('newCategory',)} className='rounded p-2 focus:border-blue-500' id='add-category' />
                                        <button type='button' disabled={isSubmitting} onClick={handleSubmit(onAddCategory)} className='bg-blue-500 py-1 rounded text-white'>Add Category</button>
                                    </form>
                                </form>
                            {/* </DialogPanel> */}
                        {/* </TransitionChild> */}
                    </div>
                {/* </Dialog> */}
            {/* </Transition > */}
            <button type='button' className='text-xs border border-red-400 rounded-md'
            onClick={()=>setOpen(true)}
            >
                add categroy
            </button>
        </Container>
    )
}

export default AddCategory
