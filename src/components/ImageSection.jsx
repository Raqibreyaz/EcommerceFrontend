import React, { useEffect } from 'react'
import { PopImage } from './PopImage';

export function ImageSection({ files, setToBeDeleted }) {

    if (!files || files === undefined)
        return null;

    let imagePaths = []
    let removeOption = false

    // when already a url is provided
    if (Array.isArray(files)) {
        imagePaths = files
        removeOption = true
    }
    // when an array of urls is provided
    else {
        imagePaths.push(files)
        removeOption = true
    }

    // popups the image and if selected to be removed then remove through its given id from database as well as 
    const handlePopImage = (src, imageId = '') => {
        PopImage(src, removeOption)
            .then((result) => {
                if (result.isConfirmed && removeOption) {
                    setToBeDeleted((prevToBeDeleted) => {
                        return [...prevToBeDeleted, ...[imageId]]
                    })
                }
            })
    }

    useEffect(() => {
        if (files instanceof FileList) {
            for (const file of files) {
                imagePaths.push(URL.createObjectURL(file))
            }
            return () => {
                for (const url of imagePaths) {
                    URL.revokeObjectURL(url)
                }
            }
        }
    }, [])


    return (
        <div className='flex gap-2 flex-wrap'>
            {
                imagePaths.map((element, index) => (
                    // when there is a remove option means it has two things url and id
                    <img key={index} src={removeOption ? element.url : element} alt="" className='size-10 rounded' onClick={(e) => handlePopImage(e.target.src, removeOption ? element.id : '')} />
                ))
            }
        </div>
    )
}

function giveUrl(filelist) {
    let srcs = []
    for (const file of filelist) {
        srcs.push(URL.createObjectURL(file))
    }
    return srcs.length > 1 ? srcs : srcs[0]
}