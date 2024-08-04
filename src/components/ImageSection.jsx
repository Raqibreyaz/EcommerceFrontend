import React, { useEffect, useState, memo, useMemo, useCallback } from 'react'
import { PopImage } from './PopImage';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

export const ImageSection = function ({ field, subField = '', removeOption = false, index }) {

    // [{url,public_id}]
    // {url,public_id}
    // FileList

    const { control, setValue } = useFormContext()

    const fieldValue = useWatch({ control, name: field })

    const getImagePaths = useCallback(
        (filelist, childField = '', arrayIndex = 0) => {

            if (!filelist)
                return []

            if (filelist instanceof FileList) {
                return Array.from(
                    { length: filelist.length },
                    (_, i) => URL.createObjectURL(filelist[i]))

            } else if (Array.isArray(filelist)) {
                if (!childField || filelist.length <= arrayIndex)
                    return filelist

                return getImagePaths(filelist[arrayIndex][childField])

            } else {
                return [filelist]
            }

        }
        , [])

    const imagePaths = getImagePaths(fieldValue, subField, index)

    // popups the image and if selected to be removed then remove through its given id from database as well as 
    const handlePopImage = (src, public_id) => {
        PopImage(src, removeOption)
            .then((result) => {

                if (result.isConfirmed && removeOption) {

                    // for colors for both images and mainImage
                    if (field === 'colors') {

                        let newColors = []

                        if (subField === 'images') {

                            newColors = fieldValue.map((color, i) => {
                                if (i === index) {
                                    return {
                                        ...color,
                                        images: color.images.filter(
                                            (image) => image.public_id !== public_id)
                                    }
                                }
                                return color
                            })
                        }

                        else {
                            newColors = fieldValue.map((color, i) => {

                                if (i === index)
                                    color.mainImage = null
                                return color
                            })
                        }
                        setValue(field, newColors)
                    }
                    // for thumbnail
                    else {
                        setValue(field, null)
                    }
                }
            })
    }

    // revoke the object of the generated url at time of unmount
    useEffect(() => {
        return () => {
            if (imagePaths.length > 0 && typeof imagePaths[0] === 'string') {
                imagePaths.forEach((imagePath) => {
                    URL.revokeObjectURL(imagePath)
                });
            }
        }
    }, [])

    return (
        <div className='flex gap-2 flex-wrap'>
            {
          imagePaths.map((element, index) => (
                    // when there is a remove option means it has two things url and id
                    <img
                        key={index}
                        src={typeof element === 'object' ?
                            element.url : element}
                        className='size-10 rounded'
                        onClick={(e) => handlePopImage(e.target.src, removeOption ? element.public_id : '')} />
                )) 
            }
        </div>
    )
}

