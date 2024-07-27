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

            // unique validation of sizes and colors
            if (new Set(data.colors.map(({ color }) => color)).size !== data.colors.length)
                FailedMessage("colors must be unique")
            if (new Set(data.sizes.map(({ size }) => size)).size !== data.sizes.length)
                FailedMessage("sizes must be unique")

            const formData = new FormData()

            const colorArray = data.colors.map(({ color }) => color)
            formData.append('colors', JSON.stringify(colorArray))

            let totalStocks = 0

            data.stocks.forEach(({ stock }) => {
                totalStocks += parseInt(stock)
            });
            formData.append('totalStocks', totalStocks)

            // // adding images and mainImages with corresponding indices
            data.colors.forEach(({ images, mainImage }, index) => {
                for (let i = 0; i < images.length; i++) {
                    formData.append(`colors[${index}].images`, images[i])
                }
                formData.append(`colors[${index}].mainImage`, mainImage[0])
            }
            )

            formData.append('keyHighlights', JSON.stringify(
                data.keyHighlights.map(({ highlight }) => highlight))
            )

            formData.append('stocks', JSON.stringify(data.stocks))

            formData.append('sizes', JSON.stringify(data.sizes.map(({ size }) => size)))


            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const value = data[key];

                    if (key !== 'keyHighlights' && key !== "stocks" && key !== 'colors' && key !== 'sizes')
                        formData.append(`${key}`, value instanceof FileList ? value[0] : value)
                }
            }

            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            catchAndShowMessage(AddNewProduct, formData)
        }
        , [])

    const fieldObj = useMemo(() => ({
        sizes: <Sizes />,
        colors: <Colors />,
        stocks: <Stocks />
    }), [])


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
                    className="space-y-6 bg-white p-6 rounded-lg shadow-md w-[95%]">

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

                    {
                        [
                            'sizes',
                            'colors',
                            'stocks'
                        ].map((field) => (
                            <div
                                key={field}
                                className="border p-4 rounded-lg space-y-4">
                                <h2
                                    className="text-lg font-semibold">
                                    {field}
                                </h2>
                                {fieldObj[field]}
                            </div>
                        ))
                    }

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
