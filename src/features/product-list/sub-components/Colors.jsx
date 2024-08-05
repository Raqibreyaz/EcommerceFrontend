import React, { memo, useCallback, useMemo } from 'react'
import { FormError, ImageSection } from '../../../components';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/20/solid';

export const ColorPart = memo(({ color, noOfColors, removeColor, index, isEditing = false }) => {

    const { control, register } = useFormContext()

    const colors = useWatch({
        control,
        name: 'colors'
    })

    return (
        <div className=" " >
            <div className='flex gap-1 items-center flex-wrap'>
                <label
                    htmlFor={`colors[${index}].color`}
                    className={`rounded size-7 max-sm:size-5 border`}
                    style={{ backgroundColor: colors[index].color }}>
                </label>
                <input
                    type="text"
                    placeholder="Color"
                    disabled={isEditing}
                    className="border p-2  rounded w-[90%]"
                    id={`colors[${index}].color`}
                    defaultValue={color}
                    {...register(`colors[${index}].color`, { required: "color field is required" })}
                />
                {noOfColors > 1 &&
                    <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className=" text-sm">
                        <TrashIcon className='size-5  text-red-500' />
                    </button>}
            </div>
            <FormError field={'colors'} index={index} subField='color' />
            {/* button to remove color */}
        </div>
    )
})

export const ImagesPart = memo(({ index, field }) => {

    const { register, control } = useFormContext()

    const colors = useWatch({ control, name: 'colors' })

    const applyValidation = useCallback(() => {

        let cond = {}

        // when images are < 3 then it impose this condition
        if ((field === 'newImages' || field === 'images') && colors[index]['images'].length < 3) {
            cond = {
                required: `you must give ${3 - colors[index]['images'].length} images to the product`,
                validate: (files) => files.length === (3 - colors[index]['images'].length) || `you must give ${3 - colors[index]['images'].length} images to the product`
            }
        }
        // some times it can be a empty filelist
        else if ((field === 'newMainImage' || field === 'mainImage')
            && (!colors[index]['mainImage'] || colors[index].mainImage.length === 0)) {
            cond = {
                required: `${field} is required`,
            }
        }
        // when all requirements matched then no condition is required to be imposed
        else {
            cond = {}
        }
        return cond;
    }, [colors])

    return (
        <div className='flex gap-2  max-sm:flex-col'>
            <label
                htmlFor="images"
                className='capitalize font-semibold'>
                {field}:
            </label>
            <input
                id='images'
                type="file"
                multiple={field === 'images' || field === 'newImages'}
                {...register(`colors[${index}].${field}`, applyValidation())}
                accept='image/*'
                className='text-gray-600 max-sm:text-sm'
            />
            <ImageSection field={"colors"} subField={field} index={index} />
            <FormError field={'colors'} index={index} subField={field} />
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
        <div
            className="border p-4 rounded-lg space-y-4">
            <h2
                className="text-lg font-semibold">
                colors
            </h2>
            <div className="rounded-lg space-y-4 bg-white">
                {colors.map(({ color, id }, index) => (
                    <div key={id} className="border p-2 rounded-lg space-y-6">
                        <ColorPart
                            color={color}
                            noOfColors={colors.length}
                            removeColor={removeColor}
                            index={index}
                        />

                        <ImagesPart
                            field={'images'}
                            index={index}
                        />

                        <ImagesPart
                            field={'mainImage'}
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
        </div>
    )
})

export default Colors
