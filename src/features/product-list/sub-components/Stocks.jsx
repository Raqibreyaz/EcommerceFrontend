import React, { memo, useEffect, useMemo, useState } from 'react'
import { FormError } from '../../../components'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

const Stocks = memo(() => {

    const { register, control, setValue } = useFormContext()

    const { fields: stocks, append: appendStock, remove: removeStock } = useFieldArray({
        control,
        name: "stocks"
    });

    const sizes = useWatch({
        control,
        name: 'sizes'
    }) ?? []
    const colors = useWatch({
        control,
        name: "colors"
    }) ?? []

    const [customStock, setCustomStock] = useState({ yes: false, defaultStocks: 100 })

    // recompute stocks when sizes or colors change
    useEffect(
        () => {

            let newStocks = [];

            if (sizes.length > 0 && colors.length > 0) {
                sizes.forEach(({ size }) => {
                    if (size) {
                        colors.forEach(({ color }) => {
                            if (color) {
                                newStocks.push({ size, color, stock: customStock.defaultStocks });
                            }
                        });
                    }
                });
                setValue('stocks', newStocks);
            }

        }, [sizes, colors, customStock])

    return (
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
                    className='w-100 border rounded'
                    placeholder={`by default ${customStock.defaultStocks}`}
                    onChange={(e) => setCustomStock(
                        {
                            yes: false,
                            defaultStocks: e.target.value
                        })} />
            </div>
            {customStock.yes ?
                stocks.map((field, index) => (
                    <div key={field.id} className="flex space-x-2 mb-2">
                        <span>size:{field.size}</span>
                        <span>color:{field.color}</span>
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
    )
})

export default Stocks
