import React, { useEffect, useState } from 'react'
import { PopImage } from './PopImage';

export function ImageSection({ files, removeOption = false, index = 0, updateOldColorImages = '' }) {

    // updateOldColorImages is for updating the frontend after removing the image;

    if (!files)
        return null;

    let imagePaths = []

    if (files instanceof FileList) {
        for (const file of files) {
            imagePaths.push(URL.createObjectURL(file))
        }
    }
    if (Array.isArray(files)) {
        imagePaths = files
    }
    else if (!(files instanceof FileList)) {
        imagePaths.push(files)
    }

    // popups the image and if selected to be removed then remove through its given id from database as well as 
    const handlePopImage = (src, public_id) => {
        PopImage(src, removeOption)
            .then((result) => {
                if (result.isConfirmed && removeOption) {
                    updateOldColorImages((prevOldColorImages) => {

                        let colorImages = { ...prevOldColorImages }

                        // store the image which is to be deleted
                        colorImages.colors[index].toBeDeleted.push(public_id)

                        // removing the image from frontend
                        colorImages.colors[index].images = colorImages.colors[index].images.filter((image) => (image.public_id !== public_id))
                        // saving the changes
                        return colorImages
                    }
                    )
                }
            })
    }

    return (
        <div className='flex gap-2 flex-wrap'>
            {
                imagePaths.map((element, index) => (
                    // when there is a remove option means it has two things url and id
                    <img key={index} src={typeof element === 'object' ? element.url : element} alt="" className='size-10 rounded' onClick={(e) => handlePopImage(e.target.src, removeOption ? element.public_id : '')} />
                ))
            }
        </div>
    )
}

