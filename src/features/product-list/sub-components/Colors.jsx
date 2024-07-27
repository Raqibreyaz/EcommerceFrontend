import React, { memo } from 'react'
import { FormError, ImageSection } from '../../../components';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

const ColorPart = memo(({ color, noOfColors, removeColor, index }) => {

    const { control, register } = useFormContext()

    const colors = useWatch({
        control,
        name: 'colors'
    })
    
    return (
        <div className="flex space-x-2 items-center w-full">
            <label
                htmlFor={`colors[${index}].color`}
                className={`rounded-full size-5 border`}
                style={{ backgroundColor: colors[index].color }}>
            </label>
            <input
                type="text"
                placeholder="Color"
                className="border p-2 rounded w-[90%]"
                id={`colors[${index}].color`}
                defaultValue={color}
                {...register(`colors[${index}].color`, { required: "color field is required" })}
            />
            <FormError field={'colors'} index={index} subField='color' />

            {/* button to remove color */}
            {noOfColors > 1 &&
                <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="text-red-500 text-sm">
                    Remove
                </button>}
        </div>
    )
})

const ImagesPart = memo(({ index }) => {
    
    const { control, register } = useFormContext()

    const colors = useWatch({
        control,
        name: 'colors'
    })

    return (
        <div className='flex gap-2'>
            <label
                htmlFor="images"
                className='capitalize font-semibold'>
                images:
            </label>
            <input
                id='images'
                type="file"
                multiple
                {...register(`colors[${index}].images`, {
                    required: "images are required",
                    validate: (files) => files.length === 3 || 'you must give 3 images to the product'
                })}
                accept='image/*'
            />
            <ImageSection files={colors[index].images} />
            <FormError field={'colors'} index={index} subField='images' />
        </div>
    )
})

const MainImagesPart = memo(({ index }) => {

    const { control, register } = useFormContext()

    const colors = useWatch({
        control,
        name: 'colors'
    })

    return (
        <div className='flex gap-2'>
            <label
                htmlFor="mainImage"
                className='capitalize font-semibold'>
                MainImage:
            </label>
            <input
                id='mainImage'
                type="file"
                {...register(`colors[${index}].mainImage`, {
                    required: "main image is required",
                    validate: (files) => files.length === 1 || "you must give a main image to the product"
                })}
                accept='image/*'
            />
            <ImageSection files={colors[index].mainImage} />
            <FormError field={'colors'} index={index} subField='mainImage' />
        </div>
    )
})

const Colors = memo(() => {

    const { control } = useFormContext()

    const { fields: colors, append: appendColor, remove: removeColor } = useFieldArray({
        control,
        name: "colors"
    })

    return (
        <div>
            {colors.map(({ color, id }, index) => (
                <div key={id} className="border p-4 rounded-lg space-y-2">
                    <ColorPart
                        color={color}
                        noOfColors={colors.length}
                        removeColor={removeColor}
                        index={index}
                    />

                    <ImagesPart
                        index={index}
                    />

                    <MainImagesPart
                        index={index}
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={() => appendColor({ color: '', mainImage: null, images: [] })}
                className="bg-blue-500 text-white px-4 py-2 mt-2 text-sm rounded">
                Add Color
            </button>
        </div>
    )
})

export default Colors
