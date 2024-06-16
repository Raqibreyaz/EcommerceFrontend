import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import FormError from '../components/FormError';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductAsync, fetchCategoriesAsync } from '../features/product-list/ProductSlice';
// import MessageDialog from '../components/MessageDialog';
import AddCategory from '../features/product-list/components/AddCategory';
import { fetchCategories } from '../features/product-list/ProductApi';

const ProductForm = () => {

    const dispatch = useDispatch()

    const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            productName: '',
            description: '',
            isReturnable: true,
            returnPolicy: '',
            details: '',
            thumbnail: '',
            sizes: [{ size: '' }],
            colors: [{ color: '', images: [], mainImage: null }],
            stocks: [], // Initialize stocks array
            keyHighlights: [{ highlight: '' }]
        }
    });

    const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
        control,
        name: 'sizes',
    });

    const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
        control,
        name: 'colors',
    });

    const { fields: stockFields, append: appendStock, remove: removeStock } = useFieldArray({
        control,
        name: 'stocks',
    });

    const { fields: highlightFields, append: appendHighlights, remove: removeHighlights } = useFieldArray({
        control,
        name: 'keyHighlights',
    });

    const onSubmit = async (data) => {

        console.log(data);

        const formData = new FormData()

        const colorArray = data.colors.map((color) => color.color)

        // adding images and mainImages with corresponding indices
        data.colors.forEach(({ images, mainImage }, index) => {
            for (let i = 0; i < images.length; i++) {
                formData.append(`colors[${index}].images[${i}]`, images[i])
            }
            formData.append(`colors[${index}].mainImage`, mainImage[0])
        }
        )

        let keyHighlights = data.keyHighlights.map((highlightObj) => highlightObj.highlight)
        let sizes = data.sizes.map((sizeObj) => sizeObj.size)

        formData.append('colors', JSON.stringify(colorArray))
        formData.append('keyHighlights', JSON.stringify(data.keyHighlights))
        formData.append('stocks', JSON.stringify(data.stocks))
        formData.append('sizes', JSON.stringify(data.sizes))

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const value = data[key];

                if (key !== 'keyHighlights' && key !== "stocks" && key !== "colors" && key !== 'sizes')
                    formData.append(`${key}`, value instanceof FileList ? value[0] : value)
            }
        }

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        dispatch(addNewProductAsync(formData))
    }


    const error = useSelector(state => state.product.error)
    const success = useSelector(state => state.product.success)
    const categories = useSelector(state => state.product.categories)


    const sizes = watch('sizes')
    const colors = watch('colors')

    const [currentColor, setCurrentColor] = useState(colors.at(-1).color)

    const handleChange = (field, value, index) => {

        if (colors.at(-1).color.length > 2)
            setCurrentColor(colors.at(-1).color)

        let newStocks = [];
        sizes.forEach((size, ind1) => {
            if (size.size) {
                colors.forEach((color, ind2) => {
                    if (color.color) {
                        newStocks.push({ size: field === 'sizes' && index === ind1 ? value : size.size, color: field === 'colors' && index === ind2 ? value : color.color, stock: 100 });
                    }
                });
            }
        });
        if (newStocks.length)
            setValue('stocks', newStocks);
    }

    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }
        , [])

    return (
        <div className='flex gap-2'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md w-[95%]">
                {/* {error && <MessageDialog head={error} />}
                {success && <MessageDialog head={success} message={success} buttonMessage='okay'
                    className='bg-green-500' />} */}

                {/* Product Name */}
                <div className="flex flex-col space-y-2">
                    {/* <label className="text-lg font-semibold" htmlFor='productName'>Product Name:</label> */}
                    <input type="text" className="border p-2 rounded placeholder:capitalize" id='productName' placeholder='product name' {...register('product_name', { required: true })} />
                    <FormError error={errors} field={'product_name'} />
                </div>
                {/* price ,totalStocks,discount,category */}
                <div className='flex flex-wrap gap-2'>
                    <div>
                        <input type="number" {...register('price', { required: true })} placeholder='Price' className='border p-2 rounded' />
                        <FormError error={errors} field={'price'} />
                    </div>

                    <div>
                        <input type="number" {...register('totalStocks', { required: true })} placeholder='Total Stocks' className='border p-2 rounded' />
                        <FormError error={errors} field={'totalStocks'} />
                    </div>
                    <div>
                        <input type="number" {...register('discount')} placeholder='Discount (in %)' className='border p-2 rounded' />
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
                    {/* <label className="text-lg font-semibold" htmlFor='description'>Description:</label> */}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <textarea rows={4} {...field} className="border p-2 rounded resize-none" id='description' placeholder='Description'></textarea>}
                        rules={{ required: true }}
                    />
                    <FormError error={errors} field={'description'} />
                </div>

                {/* details */}
                <div>
                    <textarea rows={4} {...register('details', { required: true })} placeholder='Details' id="" className='border rounded p-2 w-full resize-none'></textarea>
                </div>

                {/* keyHighlights */}
                <div className='border p-2 space-y-2'>
                    <label className='font-semibold'>Key Highlights:</label>
                    {
                        highlightFields.map((highlight, index) => (
                            <div key={highlight.id} className='space-x-1'>
                                <input {...register(`keyHighlights[${index}].highlight`, { required: true })} type="text" className='border rounded p-1 w-[90%]' placeholder='Highlight' />
                                <button type='button' className='text-red-500' onClick={() => removeHighlights(index)}>Remove</button>
                                <FormError error={errors} field={'keyHighlights'} />
                            </div>
                        ))
                    }

                    <button type='button' className='bg-blue-500 text-white p-2 rounded block' onClick={() => appendHighlights({ highlight: '' })}>Add Highlight</button>
                </div>
                {/* thumbnail */}
                <div className='border p-2 rounded '>
                    <label htmlFor="thumbnail" className='font-semibold'>Thumbnail: </label>
                    <input id='thumbnail' type="file" {...register('thumbnail', { required: true })} />
                    <FormError error={errors} field={'thumbnail'} />
                </div>

                {/* return policy */}
                <div>
                    <textarea rows={4} {...register('returnPolicy', { required: true })} placeholder='Return Policy' className='p-2 border rounded w-full resize-none' id=""></textarea>
                    <FormError error={errors} field={'returnPolicy'} />
                </div>

                {/* Sizes */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Sizes:</h2>
                    {sizeFields.map((field, index) => (
                        <div key={field.id} className="flex space-x-2 mb-2">
                            <Controller
                                name={`sizes[${index}].size`}
                                control={control}
                                render={({ field }) => (
                                    <input {...field} type="text" placeholder="Size" className="border p-2 rounded"
                                        onChange={(e) => {
                                            field.onChange(e)
                                            handleChange('sizes', e.target.value, index)
                                        }} />
                                )}
                                rules={{ required: true }}
                            />
                            <FormError error={errors} field={`sizes[${index}].size`} />
                            <button type="button" onClick={() => {
                                removeSize(index)
                                removeStock(index)
                            }} className="text-red-500">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendSize({ size: '' })} className="bg-blue-500 text-white px-4 py-2 rounded">Add Size</button>
                </div>

                {/* Colors */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Colors:</h2>
                    {colorFields.map((field, index) => (
                        <div key={field.id} className="border p-4 rounded-lg space-y-2">
                            <div className="flex space-x-2 items-center">
                                <label htmlFor={field.id} className={`rounded-full size-5 border`} style={{ backgroundColor: colors[index].color || currentColor }}></label>
                                <Controller
                                    name={`colors[${index}].color`}
                                    control={control}
                                    render={({ field }) => (
                                        <input {...field} type="text" placeholder="Color" className="border p-2 rounded" id={field.id}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                handleChange('colors', e.target.value.toLowerCase(), index)
                                            }} />
                                    )}
                                    rules={{ required: true }}
                                />
                                <FormError error={errors} field={`colors[${index}].color`} />
                                <button type="button" onClick={() => {
                                    removeColor(index)
                                    removeStock(index)
                                }} className="text-red-500">Remove</button>
                            </div>
                            <div>
                                <label htmlFor="images" className='capitalize font-semibold'>images: </label>
                                <input id='images' type="file" multiple {...register(`colors[${index}].images`, { required: true })} />
                            </div>
                            <div>
                                <label htmlFor="mainImage" className='capitalize font-semibold'>MainImage: </label>
                                <input id='mainImage' type="file" {...register(`colors[${index}].mainImage`, { required: true })} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => {
                        appendColor({ color: '', images: [], mainImage: null })
                        setCurrentColor('')
                    }} className="bg-blue-500 text-white px-4 py-2 rounded">Add Color</button>
                </div>

                {/* Stocks */}
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Stocks:</h2>
                    {stockFields.map((field, index) => (
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
                    <label htmlFor='isReturnable'>Returnable</label>
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
