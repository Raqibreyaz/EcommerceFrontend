import React, { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Colors from '../sub-components/Colors.jsx'
import { FormProvider, useForm } from 'react-hook-form'
import { Container } from '../../../components/index.js'
import { useAddNewColorsMutation, useFetchProductDetailsQuery } from '../ProductSlice.js'
import Stocks from '../sub-components/Stocks.jsx'
import { addImagesToFormData } from '../utils/addImagesToFormData.js'
import { appendToFormData } from '../utils/appendToFormData.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'

const AddNewColors = () => {

    const { id } = useParams()

    const methods = useForm({
        defaultValues: {
            colors: [{ color: '', mainImage: null, images: [] }]
        }
    })

    const { data: { product = null } = {}, isLoading: isLoadingProductDetails } = useFetchProductDetailsQuery(id)

    const { formState: { errors, isSubmitting } } = methods

    const [IntegrateNewColors, { isLoading: isIntegratingNewColors, isSuccess: isSuccessfullyIntegratedNewColors }] = useAddNewColorsMutation()

    const Navigate = useNavigate()

    const onSubmit = useCallback((data) => {
        console.log(data);

        let formData = new FormData()

        formData = addImagesToFormData(formData, data.colors, { images: 'images', mainImage: 'mainImage' })

        formData = appendToFormData(data, formData)

        if (!formData)
            return;

        catchAndShowMessage(IntegrateNewColors, {data:formData,id})
    }, [])

    useEffect(() => {
        if (isSuccessfullyIntegratedNewColors)
            Navigate(`/product-details/${id}`)
    }, [isSuccessfullyIntegratedNewColors])

    return (
        <Container
            LoadingConditions={[!!isLoadingProductDetails, !!isIntegratingNewColors]}
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}
                    className='space-y-4 bg-white p-2 rounded'
                >
                    <Colors />
                    <Stocks sizeArray={product?.sizes} isEditingColor={true} />
                    <div className='w-[70%] mt-10 mx-auto '>
                        <button type='submit' disabled={Object.keys(errors).length > 0 || isSubmitting} className='bg-green-600 text-sm p-2 rounded-md text-white  mx-auto w-full'>submit</button>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}

export default AddNewColors
