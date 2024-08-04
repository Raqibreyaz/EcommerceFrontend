import { FailedMessage } from "../../../components"

export const appendToFormData = (data, formData) => {

    if (data.stocks) {
        formData.append('stocks', JSON.stringify(data.stocks))
        let totalStocks = data.stocks.reduce((preVal, { stock }) => preVal + parseInt(stock), 0)
        formData.append('totalStocks', totalStocks)
    }

    if (data.keyHighlights)
        formData.append('keyHighlights', JSON.stringify(
            data.keyHighlights.map(({ highlight }) => highlight))
        )

    if (data.sizes) {
        if (!checkUniqueSizes(data.sizes)) {
            FailedMessage('sizes must be unique')
            return null
        }
        formData.append('sizes', JSON.stringify(data.sizes.map(({ size }) => size)))
    }

    if (data.thumbnail instanceof FileList)
        formData.append('thumbnail', data.thumbnail[0])

    if (data.colors) {

        if (!data.isEditingColors && !checkUniqueColors(data.colors)) {
            FailedMessage('colors must be unique')
            return null
        }

        const colorArray = data.colors.map((color) => (
            data.isEditingColors ?
                {
                    color: color.color,
                    images: color.images,
                    mainImage: color.mainImage
                } :
                color.color
        ))

        formData.append('colors', JSON.stringify(colorArray))
    }

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];

            if (key !== 'keyHighlights' &&
                key !== "stocks" &&
                key !== 'colors' &&
                key !== 'sizes' &&
                key !== 'thumbnail')
                formData.append(`${key}`, value)
        }
    }

    return formData
}

// returns false when unique
function checkUniqueSizes(sizes) {
    return new Set(sizes.map(({ size }) => size)).size === sizes.length
}

function checkUniqueColors(colors) {
    return new Set(colors.map(({ color }) => color)).size === colors.length
}
