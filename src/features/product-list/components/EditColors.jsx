import React, { memo, useCallback, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm, } from 'react-hook-form';
import { Container, ImageSection, SuccessMessage } from '../../../components';
import { useEditColorsAndImagesMutation, useFetchProductDetailsQuery } from '../ProductSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ColorPart, ImagesPart as NewImagesPart } from '../sub-components/Colors';
import Thumbnail from '../sub-components/Thumbnail';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import Stocks from '../sub-components/Stocks';
import { addImagesToFormData } from '../utils/addImagesToFormData';
import { appendToFormData } from '../utils/appendToFormData';

const ImagesPart = memo(({ colorIndex, field }) => {

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={`colors[${colorIndex}].${field}`}
                className="capitalize font-semibold">
                {field}:
            </label>
            <ImageSection field={'colors'} subField={field} removeOption={true} index={colorIndex} />
        </div>
    )
}
)

const Colors = memo(() => {

    const { id } = useParams()

    const Navigate = useNavigate()

    const { data: { product = null } = {}, isLoading: isLoadingProductDetails } = useFetchProductDetailsQuery(id)

    const [EditColorsAndImages, { isLoading: isEditingColors, isSuccess: isSuccessfullyEditedColors }] = useEditColorsAndImagesMutation()

    const methods = useForm();

    const { formState: { errors, isSubmitting } } = methods

    const { fields: colors, append: appendColor, remove: removeColor } = useFieldArray({ control: methods.control, name: "colors" });


    const onSubmit = useCallback((data) => {

        let formData = new FormData()

        data.isEditingColors = true

        formData = addImagesToFormData(
            formData,
            data.colors,
            { images: 'newImages', mainImage: 'newMainImage' }
        )

        formData = appendToFormData(data, formData)

        if (!formData)
            return;

        catchAndShowMessage(EditColorsAndImages, { id, data: formData })

    }, [])

    // colors-->[
    // {
    //     color:'',
    //     images:[{url:'',public_id:''}],
    //     mainImage:{url:'',public_id:''},
    //     newImages:FileList,
    //     newMainImage:FileList
    // }
    // ]
    useEffect(() => {
        if (product && Object.keys(product).length > 0) {
            console.log(product);
            methods.reset({
                colors: product.colors.map(({ color, images }) => (
                    {
                        color,
                        images: images.filter(({ _, is_main }) => !is_main).map(({ image }) => image),
                        mainImage: images.find(({ _, is_main }) => is_main).image,
                        newImages: [],
                        newMainImage: null,
                    }
                )),
                thumbnail: product.thumbnail,
                stocks: product.stocks
            })
        }
    }, [product])

    // when editing successfull then navigate to product-details page
    useEffect(() => {
        if (isSuccessfullyEditedColors) {
            Navigate(`/product-details/${id}`)
        }
    }, [isSuccessfullyEditedColors])
    console.log(product);
    return (
        <Container
            LoadingCondition={[!!isLoadingProductDetails, !!isEditingColors]}
            RenderingConditions={[!!product]}
            className='bg-white p-2'
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full space-y-5'>
                    <Thumbnail isEditing={true} />
                    {colors.map(({ color, id }, index) => (
                        <div key={id} className="border p-4 rounded-lg space-y-2">
                            <ColorPart
                                color={color}
                                noOfColors={colors.length}
                                removeColor={removeColor}
                                index={index}
                                isEditing={true}
                            />
                            {colors[index].images.length > 0 && <ImagesPart colorIndex={index} field={'images'} />}
                            {colors[index].mainImage && <ImagesPart colorIndex={index} field={'mainImage'} />}
                            {colors[index].images.length < 3 && < NewImagesPart index={index} field={'newImages'} />}
                            {!colors[index].mainImage && <NewImagesPart index={index} field={'newMainImage'} />}
                        </div>
                    ))}
                    <Stocks sizeArray={product?.sizes ?? []} isEditingColor={true} />
                    <div className='w-[70%] mx-auto '>
                        <button
                            type='submit'
                            disabled={Object.keys(errors).length > 0 || isSubmitting} className='bg-green-600 text-sm p-2 rounded-md text-white w-full capitalize font-semibold'>
                            submit
                        </button>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
});

export default Colors;
