import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'; ``
import AddCategory from './AddCategory.jsx';
import KeyHighlights from '../sub-components/KeyHighlights.jsx';
import ProductName from '../sub-components/ProductName.jsx';
import PriceDiscountCategory from '../sub-components/PriceDiscountCategory.jsx';
import DescriptionDetailsReturnPolicy from '../sub-components/DescriptionDetailsReturnPolicy.jsx'
import Thumbnail from '../sub-components/Thumbnail.jsx';
import Sizes from '../sub-components/Sizes.jsx';
import Colors from '../sub-components/Colors.jsx';
import IsReturnable from '../sub-components/IsReturnable.jsx';
import Stocks from '../sub-components/Stocks.jsx';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js';
import { useAddNewProductMutation } from '../ProductSlice.js';
import Container from '../../../components/Container.jsx';
import { useNavigate } from 'react-router-dom';
import { FailedMessage } from '../../../components/MessageDialog.jsx';
import { appendToFormData } from '../utils/appendToFormData.js';
import { addImagesToFormData } from '../utils/addImagesToFormData.js';

// image section 

const AddProduct = () => {

    const methods = useForm({
        defaultValues: {
            product_name: '',
            discount: 0,
            price: 0,
            description: '',
            isReturnable: true,
            returnPolicy: '',
            details: '',
            keyHighlights: [{ highlight: '' }],
            stocks: [{ color: '', size: '', stock: 0 }],
            sizes: [{ size: '' }],
            colors: [{ color: '', images: [], mainImage: null }],
            thumbnail: null
        }
    });

    const {
        handleSubmit,
    } = methods

    const [AddNewProduct, { isLoading: isAddingProduct, isSuccess: isSuccessfullyAddedProduct }] = useAddNewProductMutation()

    const Navigate = useNavigate()


    const onSubmit = useCallback(
        async (data) => {

            console.log(data);

            let formData = new FormData()

            formData = addImagesToFormData(formData, data.colors, { images: 'images', mainImage: 'mainImage' })

            formData = appendToFormData(data, formData)

            if (!formData)
                return;

            catchAndShowMessage(AddNewProduct, formData)
        }
        , [])

    useEffect(() => {
        if (isSuccessfullyAddedProduct) {
            methods.reset()
            Navigate('/')
        }
    }, [isSuccessfullyAddedProduct])
    return (
        <Container
            LoadingConditions={[!!isAddingProduct]}
        >
            {/* Add category  form */}
            <div className='w-40 ml-auto'>
                <AddCategory />
            </div>

            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full">

                    {/*form dependent */}
                    <ProductName />

                    {/*form dependent */}
                    <PriceDiscountCategory />

                    {/*form dependent */}
                    <DescriptionDetailsReturnPolicy />

                    {/* form dependent */}
                    <KeyHighlights />

                    {/*form independent */}
                    <Thumbnail />

                    <Sizes />

                    <Colors />
                    
                    <Stocks />

                    {/* form dependent */}
                    <IsReturnable />

                    <input
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded" />
                </form>
            </FormProvider>
        </Container>
    );
}

export default AddProduct;
