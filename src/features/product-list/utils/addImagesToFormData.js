export const addImagesToFormData = (formData, colors, imageKeys = { images: 'images', mainImage: 'mainImage' }) => {
    // imageKeys:{images:'images'|'newImages',mainImage:'mainImage'|'newMainImage'}

    colors.forEach((color, index) => {
        for (let i = 0; i < color[imageKeys['images']].length; i++) {
            formData.append(`colors[${index}].${imageKeys['images']}`,
                color[imageKeys['images']][i])
        }

        if (color[imageKeys['mainImage']])
            formData.append(`colors[${index}].${imageKeys['mainImage']}`,
                color[imageKeys['mainImage']][0])
    }
    )

    return formData
}
