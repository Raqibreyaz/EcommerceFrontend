import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container } from '../../../components/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditProductMutation, useFetchProductDetailsQuery } from '../ProductSlice';
import ProductName from '../sub-components/ProductName';
import PriceDiscountCategory from '../sub-components/PriceDiscountCategory';
import DescriptionDetailsReturnPolicy from '../sub-components/DescriptionDetailsReturnPolicy';
import KeyHighlights from '../sub-components/KeyHighlights';
import IsReturnable from '../sub-components/IsReturnable';
import Sizes from '../sub-components/Sizes';
import Stocks from '../sub-components/Stocks';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';

const EditProduct = memo(() => {

    const productId = useParams().id
    const {
        data: { product = {} } = {},
        isLoading: isLoadingProduct
    } = useFetchProductDetailsQuery(productId)

    const methods = useForm();

    const { formState: { errors, isSubmitting, isDirty } } = methods

    const Navigate = useNavigate()

    const [EditProduct, { isLoading: isEditingProduct, isSuccess: isSuccessfullEditedProduct }] = useEditProductMutation()

    const onSubmit = useCallback((wholeData) => {

        const checkDirtyField = (field, value) => {
            if (typeof value === 'boolean')
                return value

            let prop = ''
            if (field === 'keyHighlights')
                prop = 'highlight'
            else if (field === 'sizes')
                prop = 'size'

            for (const obj of value) {

                if (obj && obj[prop])
                    return true
            }
            return false
        }

        const data = {}

        for (const field in methods.formState.dirtyFields) {

            const isDirty = methods.formState.dirtyFields[field];

            // check if the field is modified by user
            if (!checkDirtyField(field, isDirty)) {
                continue;
            }

            // only for keyHighlights and sizes do this
            if (field === 'keyHighlights' || field === 'sizes') {
                data[field] = wholeData[field].map((obj) => Object.values(obj)[0])

                // when sizes are modified then stocks must be updated
                if (field === 'sizes')
                    data['stocks'] = wholeData['stocks']
            }
            // for stocks and rest other fields
            else {
                data[field] = wholeData[field]
            }
        }

        // for totalStocks
        if (data.stocks) {
            data.totalStocks = data.stocks.reduce((prevResult, { stock }) => {
                return prevResult + stock
            }, 0)
        }

        if (Object.keys(data).length > 0)
            catchAndShowMessage(EditProduct, { data, id: productId })
    }, [])

    useEffect(() => {
        if (isSuccessfullEditedProduct) {
            methods.reset()
            Navigate(`/product-details/${productId}`)
        }
    }, [isSuccessfullEditedProduct])

    // when the product is properly loaded then set the default value of the form
    useEffect(() => {
        if (product && Object.keys(product).length > 0) {

            const { colors, totalStocks, rating, _id, owner, ...rest } = product

            methods.reset({
                ...rest,
                keyHighlights: product?.keyHighlights?.map((highlight) => ({ highlight })) ??
                    [{ highlight: '' }],
                sizes: product?.sizes?.map((size) => ({ size })) ?? [{ size: '' }],
                isReturnable: rest.isReturnable
            })
        }
    }, [product])


    return (
        <Container
            LoadingConditions={[!!isLoadingProduct, !!isEditingProduct]}
            RenderingConditions={[!!product, !!(Object.keys(product).length > 0)]}
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-6 bg-white p-6 rounded-lg shadow-md w-[95%]">

                    {/*form dependent */}
                    <ProductName />

                    {/*form dependent */}
                    <PriceDiscountCategory />

                    {/*form dependent */}
                    <DescriptionDetailsReturnPolicy />

                    {/* form dependent */}
                    <KeyHighlights />

                    <Sizes />,

                    <Stocks isEditingSize={true} colorArray={product.colors ?? []} />

                    {/* form dependent */}
                    <IsReturnable />

                    <button
                        type="submit"
                        disabled={Object.keys(errors).length > 0 || isSubmitting}
                        className={`bg-green-500 cursor-pointer ${isDirty ? '' : 'hidden'}  text-white px-4 py-2 rounded capitalize font-semibold`} >
                        submit
                    </button>
                </form>
            </FormProvider>
        </Container >
    )
})

export default EditProduct;
