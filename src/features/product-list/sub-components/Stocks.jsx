import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FormError } from '../../../components'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { giveColorName } from '../../../utils/giveColorName'

const Stocks = memo(({ colorArray = [], sizeArray = [], isEditingSize = false, isEditingColor = false }) => {

    const { register, control, setValue } = useFormContext()

    const { fields: stocks, append: appendStock, remove: removeStock } = useFieldArray({
        control,
        name: "stocks"
    });

    const sizes = isEditingColor ?
        sizeArray : (useWatch({
            control,
            name: 'sizes'
        }) ?? [])

    const colors = isEditingSize ?
        colorArray : (useWatch({
            control,
            name: "colors"
        }) ?? [])

    // in editing custom stock will be preferred 
    const [customStock, setCustomStock] = useState(
        {
            yes: (isEditingColor || isEditingSize),
            defaultStocks: 100
        }
    )

    // will return 
    const checkSizeType = useCallback((x) => {
        if (x && (typeof x === 'object' && x.size))
            return x.size
        if (x && typeof x === 'string')
            return x
    }, [])

    const givePreviousStock = useCallback(
        (size, color) => {
            const stockObj = stocks.find(({ size: stockSize, color: stockColor }) => (
                stockSize === size && stockColor === color
            ))
            return stockObj?.stock ?? customStock.defaultStocks
        },
        [stocks, customStock.defaultStocks],
    )

    // recompute stocks when sizes or colors change
    useEffect(
        () => {
            let newStocks = [];
            if (sizes.length > 0 && colors.length > 0) {
                sizes.forEach((size) => {
                    if (checkSizeType(size)) {
                        colors.forEach(({ color }) => {
                            if (color) {
                                newStocks.push(
                                    {
                                        size: checkSizeType(size),
                                        color,
                                        stock: customStock.yes ? givePreviousStock(checkSizeType(size), color) : customStock.defaultStocks,
                                    }
                                );
                            }
                        });
                    }
                });
                setValue('stocks', newStocks);
            }

        }, [sizes, colors, customStock])

    return (
        <div
            className="border p-4 rounded-lg space-y-4">
            <h2
                className="text-lg font-semibold">
                stocks
            </h2>
            <div className='space-y-3'>
                <div>
                    <input
                        type="checkbox"
                        id='customStock'
                        onChange={(e) => setCustomStock(() => ({
                            yes: e.target.checked,
                            defaultStocks: customStock.defaultStocks
                        }))}
                        checked={customStock.yes} />
                    <label
                        htmlFor="customStock"
                        className='ml-1 text-sm'>
                        Add Custom Stocks or
                    </label>
                    <input
                        type="number"
                        value={customStock.defaultStocks}
                        className='w-100 border rounded ml-2'
                        placeholder={`by default ${customStock.defaultStocks}`}
                        onChange={(e) => setCustomStock(
                            {
                                yes: false,
                                defaultStocks: e.target.value
                            })} />
                </div>
                {customStock.yes ?
                    stocks.map((field, index) => (
                        <div key={field.id} className="flex max-sm:flex-col sm:space-x-2 mb-2 capitalize max-sm:text-sm">
                            <span>size: {field.size}</span>
                            <span>color: {giveColorName(field.color)}({field.color})</span>
                            <input type="number"
                                {...register(
                                    `stocks[${index}].stock`,
                                    {
                                        required: "stocks are required!!",
                                        min: {
                                            value: 0,
                                            message: "stocks cannot be less than 0"
                                        }
                                    })}
                                placeholder="Stock"
                                className="border p-2 rounded" />
                            <FormError field={`stocks`} index={index} subField='stock' />
                        </div>
                    ))
                    : null
                }
            </div>
        </div>
    )
})

export default Stocks
