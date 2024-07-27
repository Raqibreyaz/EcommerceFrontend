import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from 'react-hook-form';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import { useAddNewCategoryMutation } from '../ProductSlice';
import { Container } from '../../../components';

const MySwal = withReactContent(Swal);

const AddCategoryForm = () => {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const [AddNewCategory, { isLoading: isCreatingNewCategory, isSuccess: isSuccessfullyCreatedCategory }] = useAddNewCategoryMutation()

    const onAddCategory = (data) => {
        console.log(data);
        catchAndShowMessage(AddNewCategory,data.newCategory)
        // Handle the form submission logic here
    };

    const showForm = () => {
        MySwal.fire({
            title: 'Add a Category',
            html: (
                <form className='flex flex-col gap-2' onSubmit={handleSubmit(onAddCategory)}>
                    <input
                        type="text"
                        {...register('newCategory')}
                        className='border placeholder:text-sm placeholder:capitalize border-blue-200 rounded p-2 focus:border-blue-500' id='add-category'
                        placeholder='enter category name'
                    />
                    <button type='submit' disabled={isSubmitting} className='bg-blue-500 py-1 rounded text-white text-sm'>Add Category</button>
                </form>
            ),
            showConfirmButton: false,
        });
    };

    // React.useEffect(() => {
    //     if (isSuccessfullyCreatedCategory)
    //         MySwal.close()
    // }, [isSuccessfullyCreatedCategory])

    return (
        <Container
            LoadingConditions={[!!isCreatingNewCategory]}
        >
            <button onClick={showForm} className='bg-green-500 text-sm capitalize  p-1 m-1 rounded text-white'>Add new category</button>
        </Container>
    );
};

export default AddCategoryForm;
