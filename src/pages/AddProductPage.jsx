import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import FormError from '../components/FormError';
import { useDispatch, useSelector } from 'react-redux';
import AddCategory from '../features/product-list/components/AddCategory';
import { ImageSection } from '../components/ImageSection'


const ProductForm = () => {

    const dispatch = useDispatch()

    const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            product_name: '',
            discount: 0,
            description: '',
            isReturnable: true,
            returnPolicy: '',
            details: '',
            keyHighlights: [{ highlight: '' }]
        }
    });

    const { fields: stockFields, append: appendStock, remove: removeStock } = useFieldArray({
        control,
        name: 'stocks',
    });

    const { fields: highlightFields, append: appendHighlights, remove: removeHighlights } = useFieldArray({
        control,
        name: 'keyHighlights',
    });

    const error = useSelector(state => state.product.error)
    const success = useSelector(state => state.product.success)
    const [customStock, setCustomStock] = useState({ yes: false, defaultStocks: 100 })
    const categories = useSelector(state => state.product.categories)
    const [colorImages, setColorImages] = useState(
        {
            thumbnail: null,
            colors: [
                {
                    color: '',
                    images: [],
                    mainImage: null
                }
            ]
        }
    ) //{thumbnail,colors:[{color,images,mainImage}]}
    const [sizes, setSizes] = useState(['']) // ['size']

    const onSubmit = async (data) => {

        const formData = new FormData()

        const colorArray = colorImages.colors.map(({ color }) => color)
        let totalStocks = 0

        data.stocks.forEach(({ stock }) => {
            totalStocks += parseInt(stock)
        });

        // adding images and mainImages with corresponding indices
        colorImages.colors.forEach(({ images, mainImage }, index) => {
            for (let i = 0; i < images.length; i++) {
                formData.append(`colors[${index}].images`, images[i])
            }
            formData.append(`colors[${index}].mainImage`, mainImage[0])
        }
        )

        formData.append('thumbnail', colorImages.thumbnail[0])
        formData.append('colors', JSON.stringify(colorArray))
        formData.append('keyHighlights', JSON.stringify(
            data.keyHighlights.map(({ highlight }) => highlight))
        )
        formData.append('stocks', JSON.stringify(data.stocks))
        formData.append('sizes', JSON.stringify(sizes))
        formData.append('totalStocks', totalStocks)
        formData.append('discount', data.discount || 0)

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const value = data[key];

                if (key !== 'keyHighlights' && key !== "stocks" && key !== 'discount')
                    formData.append(`${key}`, value instanceof FileList ? value[0] : value)
            }
        }

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        dispatch(addNewProductAsync(formData))
    }

    // remove a specific field to sizes or colors
    const removeField = (field, index) => {
        if (field === 'size') {
            setSizes(sizes.filter((size, i) => i !== index))
        }
        else {
            let newColorImages = { ...colorImages }
            let colors = newColorImages.colors.filter((color, i) => i !== index)
            setColorImages({ thumbnail: newColorImages.thumbnail, colors })
        }
    }

    // add a new field to sizes or colors
    const addField = (field) => {
        if (field === 'size') {
            let newSizes = [...sizes]
            newSizes.push('')
            setSizes(newSizes)
        }
        else {
            let newColorImages = { ...colorImages }
            colorImages.colors.push({ color: '', images: [], mainImage: null })
            setColorImages(newColorImages)
        }
    }

    // if a files are added or changed then reflect the changes
    const handleFileChange = (field, files, subField = '', index = 0) => {

        let newColorImage = { ...colorImages }

        if (field === 'thumbnail') {
            console.log(field, files);
            newColorImage[field] = files
        }
        else {
            console.log(field, index, subField, files);
            if (!newColorImage[field] || newColorImage[field].length <= index) {
                (newColorImage[field] ??= []).push({ [subField]: files })
            }
            else
                newColorImage[field][index][subField] = files
        }
        console.log(newColorImage);

        setColorImages(newColorImage)
    }


    useEffect(() => {
        // dispatch(fetchCategoriesAsync())
    }
        , [])

    // updating stocks as per the colors and sizes
    useEffect(() => {

        let newStocks = [];
        sizes.forEach((size, ind1) => {
            console.log(size);
            if (size) {
                colorImages.colors.forEach((color, ind2) => {
                    if (color.color) {
                        newStocks.push({ size: size, color: color.color, stock: customStock.defaultStocks });
                    }
                });
            }
        });

        setValue('stocks', newStocks);
    }, [colorImages.colors, sizes, customStock, setValue])


    if (error) {
        FailedMessage(error)
        // .then((result) => (console.log(result)))
    }
    if (success) {
        SuccessMessage(success)
        // .then((result) => (console.log(result)))
    }


    return (
        <div className='flex gap-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md w-[95%]">
                {/* Product Name */}
                <div className="flex flex-col space-y-2">
                    <input type="text" className="border p-2 rounded placeholder:capitalize" id='productName' placeholder='product name' {...register('product_name', { required: true })} />
                    <FormError error={errors} field={'product_name'} />
                </div>
                {/* price ,totalStocks,discount,category */}
                <div className='flex flex-wrap gap-2'>
                    <div>
                        <input type="number" {...register('price', { required: true })} placeholder='Price' className='border p-2 rounded' />
                        <FormError error={errors} field={'price'} />
                    </div>

                    {/* <div>
                        <input type="number" {...register('totalStocks', { required: true })} placeholder='Total Stocks' className='border p-2 rounded' />
                        <FormError error={errors} field={'totalStocks'} />
                    </div> */}
                    <div>
                        <input type="number" {...register('discount', { min: 0 })} placeholder='Discount (in %)' className='border p-2 rounded' />
                    </div>
                    <div>
                        <select id="" {...register('category', { required: true })} className='border p-2 rounded'>
                            {
                                categories.map((category) => (
                                    <option value={category.name}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-2">
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <textarea rows={4} {...field} className="border p-2 rounded resize-none" id='description' placeholder='Description'></textarea>}
                        rules={{ required: true, minLength: 10 }}
                    />
                    <FormError error={errors} field={'description'} />
                </div>

                {/* details */}
                <div>
                    <textarea rows={4} {...register('details', { required: true, minLength: 10 })} placeholder='Details' id="" className='border rounded p-2 w-full resize-none'></textarea>
                </div>

                {/* keyHighlights */}
                <div className='border p-2 space-y-2'>
                    <label className='font-semibold'>Key Highlights:</label>
                    {
                        highlightFields.map((highlight, index) => (
                            <div key={highlight.id} className='space-x-1'>
                                <input {...register(`keyHighlights[${index}].highlight`, { required: true })} type="text" className='border rounded p-1 w-[90%]' placeholder='Highlight' />
                                {highlightFields.length > 1 && <button type='button' className='text-red-500' onClick={() => removeHighlights(index)}>Remove</button>}
                                <FormError error={errors} field={'keyHighlights'} />
                            </div>
                        ))
                    }

                    <button type='button' className='bg-blue-500 text-white p-2 rounded block' onClick={() => appendHighlights({ highlight: '' })}>Add Highlight</button>
                </div>
                {/* thumbnail */}
                <div className='border p-2 rounded flex gap-2'>
                    <label htmlFor="thumbnail" className='font-semibold'>Thumbnail: </label>
                    <input id='thumbnail' type="file" required
                        onChange={(e) => {
                            setColorImages((prevColorImages) => {
                                const newObj = { ...prevColorImages }
                                newObj.thumbnail = e.target.files
                                return newObj
                            }
                            )
                        }}
                    />
                    <ImageSection files={colorImages.thumbnail} />
                </div>

                {/* return policy */}
                <div>
                    <textarea rows={4} {...register('returnPolicy', { required: true })} placeholder='Return Policy' className='p-2 border rounded w-full resize-none' id=""></textarea>
                    <FormError error={errors} field={'returnPolicy'} />
                </div>

                {/* Sizes */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Sizes:</h2>
                    {sizes.map((size, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input type="text" placeholder="Size" className="border p-2 rounded" value={size} required
                                onChange={(e) => {
                                    setSizes((prevSizes) => {
                                        let newSizes = [...prevSizes]
                                        newSizes[index] = e.target.value
                                        return newSizes
                                    });
                                }} />
                            {/* <FormError field={'size'} /> */}
                            {sizes.length > 1 && <button type="button" onClick={() => {
                                removeField('size', index)
                                removeStock(index)
                            }} className="text-red-500">Remove</button>}
                        </div>
                    ))}
                    <button type="button" onClick={() => addField('size')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Size</button>
                </div>

                {/* Colors */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Colors:</h2>
                    {colorImages.colors.map((color, index) => (
                        <div key={index} className="border p-4 rounded-lg space-y-2">
                            <div className="flex space-x-2 items-center">
                                <label htmlFor={`colors[${index}].color`} className={`rounded-full size-5 border`} style={{ backgroundColor: color.color }}></label>
                                <input type="text" placeholder="Color" className="border p-2 rounded" id={`colors[${index}].color`}
                                    value={color.color}
                                    required
                                    onChange={(e) => {
                                        setColorImages((prevColorImages) => {
                                            const newColors = prevColorImages.colors.map((colorObj, colorIndex) =>
                                                colorIndex === index ? { ...colorObj, color: e.target.value } : colorObj
                                            );
                                            return { ...prevColorImages, colors: newColors };
                                        });
                                    }} />
                                {/* <FormError field={`color`} /> */}
                                {colorImages.colors.length > 1 && <button type="button" onClick={() => {
                                    removeField('colors', index)
                                    removeStock(index)
                                }} className="text-red-500">Remove</button>}
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="images" className='capitalize font-semibold'>images: </label>
                                <input id='images' type="file" multiple required
                                    onChange={(e) => handleFileChange('colors', e.target.files, 'images', index)}
                                />
                                <ImageSection files={colorImages.colors[index].images} />
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="mainImage" className='capitalize font-semibold'>MainImage: </label>
                                <input id='mainImage' type="file" required
                                    onChange={(e) => handleFileChange('colors', e.target.files, 'mainImage', index)}
                                />
                                <ImageSection files={colorImages.colors[index].mainImage} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => {
                        addField('colors')
                        setCurrentColor('')
                    }} className="bg-blue-500 text-white px-4 py-2 rounded">Add Color</button>
                </div>

                {/* Stocks */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Stocks:</h2>
                    <div>
                        <input type="checkbox" id='customStock' onChange={(e) => setCustomStock({ yes: e.target.checked, defaultStocks: customStock.defaultStocks })} checked={customStock.yes} />
                        <label htmlFor="customStock" className='ml-1 text-sm'>Add Custom Stocks or </label><input type="number" value={customStock.defaultStocks} className='w-100 border rounded' placeholder={`by default ${customStock.defaultStocks}`} onChange={(e) => setCustomStock({ yes: false, defaultStocks: e.target.value })} />
                    </div>
                    {customStock.yes && stockFields.map((field, index) => (
                        <div key={field.id} className="flex space-x-2 mb-2">

                            <span>size:{field.size}</span>
                            <span>color:{field.color}</span>
                            <Controller
                                name={`stocks[${index}].stock`}
                                control={control}
                                render={({ field }) => (
                                    <input {...field} type="number" placeholder="Stock" className="border p-2 rounded" />
                                )}
                                rules={{ required: true }}
                            />
                            <FormError error={errors} field={`stocks[${index}].stock`} />
                        </div>
                    ))}
                </div>

                {/* isReturnable */}
                <div>
                    <input type='checkbox' {...register('isReturnable')} defaultChecked={true} className='mr-1' id='isReturnable' />
                    <label htmlFor='isReturnable' className='text-sm'>Returnable</label>
                </div>

                <input type="submit" className="bg-green-500 text-white px-4 py-2 rounded" />
            </form>
            <div>
                <AddCategory />
            </div>
        </div>
    );
}

export default ProductForm;
