import React from 'react'
import { PopImage } from './PopImage';

export function ImageSection({ files }) {

    if (!files)
        return;

    let imagePaths = []

    for (const file of files) {
        imagePaths.push(URL.createObjectURL(file))
    }

   const handlePopImage = (src) => {
        PopImage(src)
    }

    return (
        <div className='flex gap-2 flex-wrap'>
            {
                imagePaths.map((src, index) => (
                    <img key={index + Date.now()} src={src} alt="" className='size-10 rounded' onClick={(e) => handlePopImage(e.target.src)} />
                ))
            }
        </div>
    )
}

