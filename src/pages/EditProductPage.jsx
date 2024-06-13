import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const ProductForm = () => {
    const { register, control, handleSubmit, watch, setValue, reset } = useForm({
        defaultValues: {
            productName: '',
            description: '',
            sizes: [{ size: '' }],
            colors: [{ color: '', images: [], mainImage: null }],
            stocks: []
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

    const sizes = watch('sizes');
    const colors = watch('colors');

    const handleImageChange = (index, files) => {
        const updatedColors = colors.map((color, colorIndex) => {
            if (colorIndex === index) {
                return { ...color, images: files };
            }
            return color;
        });
        setValue('colors', updatedColors);
    };

    const handleMainImageChange = (index, file) => {
        const updatedColors = colors.map((color, colorIndex) => {
            if (colorIndex === index) {
                return { ...color, mainImage: file };
            }
            return color;
        });
        setValue('colors', updatedColors);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('description', data.description);

        console.log(data);

        // data.colors.forEach((color, colorIndex) => {
        //     formData.append(`colors[${colorIndex}][color]`, color.color);
        //     formData.append(`colors[${colorIndex}][mainImage]`, color.mainImage);
        //     Array.from(color.images).forEach((file) => {
        //         formData.append(`colors[${colorIndex}][images]`, file);
        //     });
        // });

        // data.stocks.forEach((stock, index) => {
        //     formData.append(`stocks[${index}][size]`, stock.size);
        //     formData.append(`stocks[${index}][color]`, stock.color);
        //     formData.append(`stocks[${index}][stock]`, stock.stock);
        // });

        // try {
        //     const response = await axios.post('http://localhost:3000/api/product', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     console.log(response.data);
        //     reset(); // Reset the form after successful submission
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold">Product Name:</label>
                <input type="text" {...register('productName')} required className="border p-2 rounded" />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold">Description:</label>
                <textarea {...register('description')} required className="border p-2 rounded"></textarea>
            </div>
            <div className="border p-4 rounded-lg space-y-4">
                <h2 className="text-lg font-semibold">Sizes:</h2>
                {sizeFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            placeholder="Size"
                            {...register(`sizes.${index}.size`)}
                            className="border p-2 rounded"
                        />
                        <button type="button" onClick={() => removeSize(index)} className="text-red-500">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => appendSize({ size: '' })} className="bg-blue-500 text-white px-4 py-2 rounded">Add Size</button>
            </div>
            <div className="border p-4 rounded-lg space-y-4">
                <h2 className="text-lg font-semibold">Colors:</h2>
                {colorFields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded-lg space-y-2">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Color"
                                {...register(`colors.${index}.color`)}
                                className="border p-2 rounded"
                            />
                            <button type="button" onClick={() => removeColor(index)} className="text-red-500">Remove</button>
                        </div>
                        <div className="flex flex-col space-y-2 mt-2">
                            <label>Images:</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleImageChange(index, e.target.files)}
                                className="border p-2 rounded"
                            />
                            <label>Main Image:</label>
                            <input
                                type="file"
                                onChange={(e) => handleMainImageChange(index, e.target.files[0])}
                                className="border p-2 rounded"
                            />
                            {colors[index].mainImage && (
                                <div className="mt-2">
                                    <p className="font-semibold">Main Image Preview:</p>
                                    <img
                                        src={URL.createObjectURL(colors[index].mainImage)}
                                        alt="Main"
                                        className="w-32 h-32 object-cover mt-2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => appendColor({ color: '', images: [], mainImage: null })} className="bg-blue-500 text-white px-4 py-2 rounded">Add Color</button>
            </div>

            {sizes.length > 0 && colors.length > 0 && (
                <div className="border p-4 rounded-lg space-y-4">
                    <h2 className="text-lg font-semibold">Stock:</h2>
                    {sizes.map((size, sizeIndex) => (
                        colors.map((color, colorIndex) => (
                            <div key={`${size.size}-${color.color}`} className="flex space-x-2 mb-2">
                                <span className="font-semibold">Size: {size.size}, Color: {color.color}</span>
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    {...register(`stocks.${sizeIndex * colors.length + colorIndex}.stock`)}
                                    className="border p-2 rounded"
                                />
                                <input type="hidden" {...register(`stocks.${sizeIndex * colors.length + colorIndex}.size`)} value={size.size} />
                                <input type="hidden" {...register(`stocks.${sizeIndex * colors.length + colorIndex}.color`)} value={color.color} />
                            </div>
                        ))
                    ))}
                </div>
            )}

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
    );
};

export default ProductForm;
