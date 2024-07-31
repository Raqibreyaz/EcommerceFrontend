import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container } from '../../../components/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditProductMutation, useFetchProductDetailsQuery } from '../ProductSlice';
import ProductName from '../sub-components/ProductName';
import PriceDiscountCategory from '../sub-components/PriceDiscountCategory';
import DescriptionDetailsReturnPolicy from '../sub-components/DescriptionDetailsReturnPolicy';
import KeyHighlights from '../sub-components/KeyHighlights';
import IsReturnable from '../sub-components/IsReturnable';
import Sizes from '../sub-components/Sizes';
import Stocks from '../sub-components/Stocks';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';


// const EditProduct = () => {

//     const dispatch = useDispatch()
//     const product = useSelector((state) => state.product.currentProduct)

//     const productId = useParams().id

// const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
//     defaultValues: {
//         product_name: product.product_name,
//         discount: product.discount,
//         description: product.description,
//         isReturnable: product.isReturnable,
//         returnPolicy: product.returnPolicy,
//         details: product.details,
//         keyHighlights: product.keyHighlights.map((highlight) => ({ highlight: highlight })),
//         category: product.category,
//         stocks: product.stocks,
//         price: product.price
//     }
// });

//     const { fields: stockFields, append: appendStock, remove: removeStock } = useFieldArray({
//         control,
//         name: 'stocks',
//     });

//     const { fields: highlightFields, append: appendHighlights, remove: removeHighlights } = useFieldArray({
//         control,
//         name: 'keyHighlights',
//     });

//     const error = useSelector(state => state.product.error)
//     const success = useSelector(state => state.product.success)
//     const [customStock, setCustomStock] = useState({ yes: true, defaultStocks: 100 })
//     const categories = useSelector(state => state.product.categories)

//     const [oldColorImages, updateOldColorImages] = useState({
//         thumbnail: product.thumbnail,
//         newThumbnail: null,//{image:{url,public_id,_id},is_main,_id}
//         colors: product.colors.map(({ color, images, _id }) => (
//             {
//                 color,
//                 images: images.filter(({ is_main }) => !is_main).map((image) => ({
//                     url: image.image?.url,
//                     public_id: image.image?.public_id
//                 })),
//                 mainImage: images.filter(({ is_main }) => is_main).map((image) => (
//                     {
//                         url: image.image?.url,
//                         public_id: image.image?.public_id
//                     }
//                 ))[0],
//                 toBeDeleted: [ /*id*/], //public_id of all images which are to be deleted
//                 toBeInserted: { images: [], mainImage: null },
//                 _id //id of the color useful when color name is updated
//             }
//         ))
//     })

//     const [newColorImages, setNewColorImages] = useState([ /*{color:'',images:FileList,mainImage:FileList}*/]
//     )

//     const [sizes, setSizes] = useState(product.sizes) // ['size']



//     const onSubmit = async (data) => {

//         const formData = new FormData()

//         let uniqueCheck = []

//         let oldColors = oldColorImages.colors.map(({ color, _id, toBeDeleted, images, mainImage }) => {
//             uniqueCheck.push(color)
//             return {
//                 color,
//                 images: images.map((imageObj) => (
//                     {
//                         image: {
//                             url: imageObj.url,
//                             public_id: imageObj.public_id
//                         },
//                         is_main: false
//                     }
//                 )),
//                 mainImage: {
//                     image: {
//                         url: mainImage.url,
//                         public_id: mainImage.public_id
//                     },
//                     is_main: true
//                 },
//                 toBeDeleted, //publicIds of images
//                 colorId: _id,
//             }
//         })

//         if (uniqueCheck.length !== (new Set(uniqueCheck)).size) {
//             FailedMessage('duplicate colors are not allowed')
//         }

//         // a separate array for newColors
//         let newColors = newColorImages.map(({ color }) => color)

//         uniqueCheck = [...uniqueCheck, ...newColors]

//         if (uniqueCheck.length !== (new Set(uniqueCheck)).size) {
//             FailedMessage('duplicate colors are not allowed')
//         }

//         if (sizes.length !== (new Set(sizes)).size)
//             FailedMessage('duplicate sizes are not allowed')

//         // since if new thumbnail exists then it will be a filelist
//         if (oldColorImages.newThumbnail) {
//             formData.append('newThumbnail', oldColorImages.newThumbnail[0])
//         }

//         // take all the images and mainImage which are to be inserted for existing color
//         oldColorImages.colors.forEach((colorObj, index) => {

//             // since images will be a filelist 
//             for (let i = 0; i < colorObj.toBeInserted.images.length; i++) {
//                 let file = colorObj.toBeInserted.images[i]
//                 // the index defines the specific color index 
//                 formData.append(`toBeInserted[${index}]`, file)
//             }

//             // when mainImage of that particular color is changed
//             if (colorObj.toBeInserted.mainImage) {
//                 formData.append(`newMainImage[${index}]`, colorObj.toBeInserted.mainImage[0])
//             }
//         });

//         // handling newColors images
//         newColorImages.forEach(({ images, mainImage }, index) => {

//             // since images is a filelist
//             for (let i = 0; i < images.length; i++) {
//                 const file = images[i];
//                 // indexTh color of newColors ith image of images has a file
//                 formData.append(`newColors[${index}]`, file)
//             }
//             // since it is a filelist
//             formData.append(`newColors[${index}].mainImage`, mainImage[0])
//         })

//         const keyHighlights = data.keyHighlights.map(({ highlight }) => highlight)

//         let totalStocks = 0

//         data.stocks.forEach(({ stock }) => {
//             totalStocks += parseInt(stock)
//         });

//         data.totalStocks = totalStocks
//         data.productId = product._id

//         // handled json
//         formData.append('stocks', JSON.stringify(data.stocks))
//         formData.append('keyHighlights', JSON.stringify(keyHighlights))
//         formData.append('oldColors', JSON.stringify(oldColors))
//         formData.append('sizes', JSON.stringify(sizes))
//         formData.append('newColors', JSON.stringify(newColors))

//         for (const key in data) {
//             if (Object.hasOwnProperty.call(data, key)) {
//                 const value = data[key];

//                 if (key !== 'keyHighlights' && key !== 'stocks') {
//                     formData.append(key, value)
//                 }
//             }
//         }

//         for (const [key, value] of formData.entries()) {
//             console.log(key, value);
//         }

//         dispatch(editProductAsync(formData))
//     }

//     const updateStocks = (newSizes = '', oldColors = '', newColors = '') => {

//         if (!newSizes)
//             newSizes = sizes
//         if (!oldColors)
//             oldColors = oldColorImages.colors
//         if (!newColors)
//             newColors = newColorImages

//         let newStocks = []

//         const givePreviousStock = (size, color) => {
//             return stockFields.filter(({ size: stockSize, color: stockColor }) => (
//                 stockSize === size && stockColor === color
//             ))[0].stock
//         }


//         newSizes.forEach((size) => {
//             if (size) {
//                 oldColors.forEach(({ color }) => {
//                     // console.log(color);
//                     if (color)
//                         newStocks.push({ size, color, stock: customStock.yes ? givePreviousStock(size, color) : customStock.defaultStocks })
//                 });
//                 newColors.forEach(({ color }) => {
//                     // console.log(color);
//                     if (color)
//                         newStocks.push({ size, color, stock: customStock.defaultStocks })
//                 });
//             }
//         });
//         setValue('stocks', newStocks)
//     }

//     // just give the index and will remove the color or size
//     const removeField = (field, index) => {

//         // console.log('going to remove ', index, 'from', field);

//         // for removing a color from old colors
//         if (field === 'oldColors') {
//             updateOldColorImages((prevOldColorImages) => {
//                 // removing that particular color
//                 const newColors = prevOldColorImages.colors.filter((colorObj, colorIndex) => colorIndex !== index
//                 );
//                 updateStocks(sizes, newColors, newColorImages)
//                 // finally return the updated version
//                 return { ...prevOldColorImages, colors: newColors };
//             })
//         }

//         // removing a size
//         else if (field === 'size') {
//             // setSizes(sizes.filter((size, i) => i !== index))
//             setSizes((prevSizes) => {
//                 // remove the 
//                 let newSizes = prevSizes.filter((_, i) => i !== index)
//                 updateStocks(newSizes, oldColorImages.colors, newColorImages)
//                 return newSizes
//             }
//             )
//         }
//         // 
//         else {
//             // setNewColorImages(newColorImages.filter((color, i) => (i !== index)))
//             setNewColorImages((prevNewColorImages) => {
//                 let colorImages = prevNewColorImages.filter((_, i) => i !== index)
//                 updateStocks(sizes, oldColorImages.colors, colorImages)
//                 return colorImages
//             }
//             )
//         }
//     }

//     // just give field name and it will add a new entry
//     // not for old images
//     const addField = (field) => {

//         // console.log('adding new entry to ', field);

//         if (field === 'size') {
//             // setSizes([...sizes,''])
//             setSizes((prevSizes) => {
//                 let newSizes = [...prevSizes, '']
//                 // console.log(newSizes);
//                 updateStocks(newSizes, oldColorImages.colors, newColorImages)
//                 return newSizes
//             }
//             )
//         }
//         else {
//             let colorImages = [...newColorImages]
//             colorImages.push({ id: Date.now(), color: '', images: [], mainImage: null })
//             // console.log('added new entry ', colorImages);
//             updateStocks(sizes, oldColorImages.colors, colorImages)
//             setNewColorImages(colorImages)
//         }
//     }

//     // 
//     const handleFileChange = (field, files, subField, index = 0) => {

//         // field--> oldColors, newColors
//         // subField--> images, mainImage

//         //oldColors:{thumbnail,colors}

//         for (const file of files) {
//             if (!file.type.includes('image/'))
//                 return FailedMessage('Only Images Are Allowed')
//         }

//         // console.log('adding files to ', field, subField);

//         if (field === 'oldColors') {

//             // 
//             if (subField === 'thumbnail') {
//                 let obj = { ...oldColorImages, newThumbnail: files }
//                 // console.log(obj);
//                 updateOldColorImages(obj)
//             }
//             // else if (subField === 'mainImage') {
//             //     updateOldColorImages((prevOldColorImages) => {
//             //         let colorImages = { ...prevOldColorImages }
//             //         colorImages[field][index].newMainImage = files
//             //         return colorImages
//             //     }
//             //     )
//             // }
//             // new image will  always be added to toBeInserted by specifying the field
//             // *index
//             else {
//                 updateOldColorImages((prevOldColorImages) => {
//                     let newColors = prevOldColorImages.colors.map((color, i) => {
//                         if (i === index) {
//                             color.toBeInserted[subField] = files
//                         }
//                         return color
//                     })
//                     return { ...prevOldColorImages, colors: newColors }
//                 }
//                 )
//             }
//         }
//         // just have to add new files to that specific subfield
//         // *index
//         if (field === 'newColors') {
//             setNewColorImages(
//                 (prevNewColorImages) => {
//                     let colorImages = [...prevNewColorImages]
//                     colorImages[index][subField] = files
//                     // console.log('added files to ', field, subField, colorImages);
//                     return colorImages
//                 }
//             )
//         }
//     }

//     if (error) {
//         FailedMessage(error)
//         // .then((result) => (console.log(result)))
//     }
//     if (success && !success.includes('categories')) {
//         SuccessMessage(success)
//         // .then((result) => (console.log(result)))
//     }

//     useEffect(() => {
//         updateStocks()
//     }
//         , [customStock])

//     useEffect(() => {
//         dispatch(fetchProductDetailsAsync(productId))
//         dispatch(fetchCategoriesAsync())
//     }, [])

//     return (
//         <div className='flex gap-2'>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md w-[95%]">
//                 {/* Product Name */}
//                 <div className="flex flex-col space-y-2">
//                     <label htmlFor="productName" className='capitalize font-semibold'>product name:</label>
//                     <input type="text" className="border p-2 rounded placeholder:capitalize" id='productName' placeholder='product name' {...register('product_name', { required: true })} />
//                     <FormError error={errors} field={'product_name'} />
//                 </div>
//                 {/* price ,totalStocks,discount,category */}
//                 <div className='flex flex-wrap gap-2'>
//                     <div>
//                         <label htmlFor="price" className='capitalize font-semibold'>price:</label>
//                         <input type="number" id='price' {...register('price', { required: true })} placeholder='Price' className='border p-2 rounded' />
//                         <FormError error={errors} field={'price'} />
//                     </div>
//                     <div>
//                         <label htmlFor="discount" className='capitalize font-semibold'>discount: </label>
//                         <input type="number" id='discount' {...register('discount', { min: 0 })} placeholder='Discount (in %)' className='border p-2 rounded' />
//                     </div>
//                     <div>
//                         <label htmlFor="category" className='capitalize font-semibold'>category:</label>
//                         <select id="category" {...register('category', { required: true })} className='border p-2 rounded'>
//                             {
//                                 categories.map((category) => (
//                                     <option key={category._id} value={category.name}>{category.name}</option>
//                                 ))
//                             }
//                         </select>
//                     </div>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col space-y-2">
//                     <label htmlFor="description" className='capitalize font-semibold'>description:</label>
//                     <Controller
//                         name="description"
//                         control={control}
//                         render={({ field }) => <textarea rows={4} {...field} className="border p-2 rounded resize-none" id='description' placeholder='Description'></textarea>}
//                         rules={{ required: true, minLength: 10 }}
//                     />
//                     <FormError error={errors} field={'description'} />
//                 </div>

//                 {/* details */}
//                 <div>
//                     <label htmlFor="details" className='capitalize font-semibold'>details:</label>
//                     <textarea rows={4} {...register('details', { required: true, minLength: 10 })} placeholder='Details' id="details" className='border rounded p-2 w-full resize-none'></textarea>
//                 </div>

//                 {/* keyHighlights */}
//                 <div className='border p-2 space-y-2'>
//                     <label className='font-semibold'>Key Highlights:</label>
//                     {
//                         highlightFields.map((highlight, index) => (
//                             <div key={highlight.id} className='space-x-1'>
//                                 <input {...register(`keyHighlights[${index}].highlight`, { required: true })} type="text" className='border rounded p-1 w-[90%]' placeholder='Highlight' />
//                                 {highlightFields.length > 1 && <button type='button' className='text-red-500' onClick={() => removeHighlights(index)}>Remove</button>}
//                                 <FormError error={errors} field={'keyHighlights'} />
//                             </div>
//                         ))
//                     }

//                     <button type='button' className='bg-blue-500 text-white p-2 rounded block' onClick={() => appendHighlights({ highlight: '' })}>Add Highlight</button>
//                 </div>
//                 {/* thumbnail */}
//                 <div className='border p-2 rounded flex gap-2'>
//                     <label htmlFor="thumbnail" className='font-semibold'>Thumbnail: </label>
//                     <input id='thumbnail' type="file" accept='image/*'
//                         onChange={(e) => {
//                             handleFileChange('oldColors', e.target.files, 'thumbnail')
//                         }}
//                     />
//                     <ImageSection files={oldColorImages.newThumbnail || oldColorImages.thumbnail} />
//                 </div>

//                 {/* return policy */}
//                 <div>
//                     <label htmlFor="return policy" className='capitalize font-semibold'>return policy:</label>
//                     <textarea rows={4} {...register('returnPolicy', { required: true })} placeholder='Return Policy' className='p-2 border rounded w-full resize-none' id="return policy"></textarea>
//                     <FormError error={errors} field={'returnPolicy'} />
//                 </div>

//                 {/* Sizes */}
//                 <div className="border p-4 rounded-lg space-y-4">
//                     <h2 className="text-lg font-semibold">Sizes:</h2>
//                     {sizes.map((size, index) => (
//                         <div key={index} className="flex space-x-2 mb-2">
//                             <input type="text" placeholder="Size" className="border p-2 rounded" value={size} required
//                                 onChange={(e) => {
//                                     setSizes((prevSizes) => {
//                                         let newSizes = [...prevSizes]
//                                         newSizes[index] = e.target.value
//                                         updateStocks(newSizes)
//                                         return newSizes
//                                     });
//                                 }} />
//                             {/* <FormError field={'size'} /> */}
//                             {sizes.length > 1 && <button type="button" onClick={() => {
//                                 removeField('size', index)
//                             }} className="text-red-500">Remove</button>}
//                         </div>
//                     ))}
//                     <button type="button" onClick={() => addField('size')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Size</button>
//                 </div>

//                 {/* Colors */}
//                 <div className="border p-4 rounded-lg space-y-4">
//                     <h2 className="text-lg font-semibold">Colors:</h2>
//                     {oldColorImages.colors.map((color, index) => (
//                         <div key={color.id} className="border p-4 rounded-lg space-y-2">
//                             {/* color input */}
//                             <div className="flex space-x-2 items-center">
//                                 <label htmlFor={`oldColors[${index}].color`} className={`rounded-full size-5 border`} style={{ backgroundColor: color.color }}></label>
//                                 <input type="text" placeholder="Color" className="border p-2 rounded" id={`oldColors[${index}].color`}
//                                     value={color.color}
//                                     required
//                                     onChange={(e) => {
//                                         // when color name is to updated
//                                         updateOldColorImages((prevOldColorImages) => {
//                                             const newColors = prevOldColorImages.colors.map((colorObj, colorIndex) =>
//                                                 // find the color and update
//                                                 colorIndex === index ? { ...colorObj, color: e.target.value } : colorObj
//                                             );
//                                             updateStocks('', newColors)
//                                             // finally return the updated version
//                                             return { ...prevOldColorImages, colors: newColors };
//                                         });
//                                     }} />
//                                 {/* when the color is being deleted */}
//                                 {(oldColorImages.colors.length > 1 || (oldColorImages.colors.length + newColorImages.length) > 1) && <button type="button" onClick={() => {
//                                     // remove from old colors as it belongs to it
//                                     removeField('oldColors', index)
//                                 }} className="text-red-500">Remove</button>}
//                             </div>
//                             {/* images input */}
//                             <div className='flex gap-2'>
//                                 <label htmlFor="images" className='capitalize font-semibold'>images: </label>
//                                 <input id='images' type="file" multiple accept='image/*'
//                                     onChange={(e) => handleFileChange('oldColors', e.target.files, 'images', index)}
//                                 />
//                                 {/* have to show ad update if there is to delete any image */}
//                                 <ImageSection files={oldColorImages.colors[index].images} updateOldColorImages={updateOldColorImages} removeOption={true} index={index} />
//                                 {/* here we just have to show the image only */}
//                                 <ImageSection files={oldColorImages.colors[index].toBeInserted.images} />
//                             </div>
//                             {/* main image inpuy */}
//                             <div className='flex gap-2'>
//                                 <label htmlFor="mainImage" className='capitalize font-semibold'>MainImage: </label>
//                                 <input id='mainImage' type="file" accept='image/*'
//                                     onChange={(e) => handleFileChange('oldColors', e.target.files, 'mainImage', index)}
//                                 />
//                                 <ImageSection files={oldColorImages.colors[index].toBeInserted.mainImage || oldColorImages.colors[index].mainImage} removeOption={false} updateOldColorImages={updateOldColorImages} />
//                             </div>
//                         </div>
//                     ))}
//                     {
//                         newColorImages.map(({ color, images, mainImage }, index) => (
//                             <div key={color.id} className="border p-4 rounded-lg space-y-2">
//                                 {/* color input */}
//                                 <div className="flex space-x-2 items-center">
//                                     <label htmlFor={`newColors[${index}].color`} className={`rounded-full size-5 border`} style={{ backgroundColor: color }}></label>
//                                     <input type="text" placeholder="Color" className="border p-2 rounded" id={`newColors[${index}].color`}
//                                         value={color}
//                                         required
//                                         onChange={(e) => {
//                                             setNewColorImages((prevNewColorImages) => {
//                                                 let colorImages = [...prevNewColorImages]
//                                                 colorImages[index].color = e.target.value
//                                                 updateStocks('', '', colorImages)
//                                                 return colorImages
//                                             }
//                                             )
//                                         }} />
//                                     {/* when the color is being deleted */}
//                                     <button type="button" onClick={() => {
//                                         // remove from new colors as it belongs to it
//                                         removeField('newColors', index)
//                                         // update stocks
//                                         // removeStock(index)
//                                     }} className="text-red-500">Remove</button>

//                                 </div>
//                                 {/* images input */}
//                                 <div className='flex gap-2'>
//                                     <label htmlFor="images" className='capitalize font-semibold'>images: </label>
//                                     <input id='images' type="file" multiple required
//                                         onChange={(e) => handleFileChange('newColors', e.target.files, 'images', index)}
//                                     />
//                                     {/* have to show ad update if there is to delete any image */}
//                                     <ImageSection files={newColorImages[index].images} />
//                                 </div>
//                                 {/* main image input */}
//                                 <div className='flex gap-2'>
//                                     <label htmlFor="mainImage" className='capitalize font-semibold'>MainImage: </label>
//                                     <input id='mainImage' type="file" required
//                                         onChange={(e) => handleFileChange('newColors', e.target.files, 'mainImage', index)}
//                                     />
//                                     <ImageSection files={newColorImages[index].mainImage} />
//                                 </div>
//                             </div>
//                         ))
//                     }
//                     {/* add fields in new colors */}
//                     <button type="button" onClick={() => {
//                         addField('newColors')
//                     }} className="bg-blue-500 text-white px-4 py-2 rounded">Add Color</button>
//                 </div>

//                 {/* Stocks */}
//                 <div className="border p-4 rounded-lg space-y-4">
//                     <h2 className="text-lg font-semibold">Stocks:</h2>
//                     <div>
//                         <input type="checkbox" id='customStock' onChange={(e) => setCustomStock({ yes: e.target.checked, defaultStocks: customStock.defaultStocks })} checked={customStock.yes} />
//                         <label htmlFor="customStock" className='ml-1 text-sm'>Add Custom Stocks or </label>
//                         <input type="number" value={customStock.defaultStocks} className='w-100 border rounded' placeholder={`by default ${customStock.defaultStocks}`} onChange={(e) => setCustomStock({ yes: false, defaultStocks: e.target.value })} />
//                     </div>
//                     {customStock.yes && stockFields.map((field, index) => (
//                         <div key={field.id} className="flex space-x-2 mb-2">

//                             <span>size:{field.size}</span>
//                             <span>color:{field.color}</span>
//                             <Controller
//                                 name={`stocks[${index}].stock`}
//                                 control={control}
//                                 render={({ field }) => (
//                                     <input {...field} type="number" placeholder="Stock" className="border p-2 rounded" />
//                                 )}
//                                 rules={{ required: true }}
//                             />
//                             <FormError error={errors} field={`stocks[${index}].stock`} />
//                         </div>
//                     ))}
//                 </div>

//                 {/* isReturnable */}
//                 <div>
//                     <input type='checkbox' {...register('isReturnable')} defaultChecked={true} className='mr-1' id='isReturnable' />
//                     <label htmlFor='isReturnable' className='text-sm'>Returnable</label>
//                 </div>

//                 <input type="submit" className="bg-green-500 text-white px-4 py-2 rounded" />
//             </form>
//             <div>
//                 <AddCategory />
//             </div>
//         </div>
//     );
// }

const EditProduct = memo(() => {

    const productId = useParams().id
    const {
        data: { product = {} } = {},
        isLoading: isLoadingProduct
    } = useFetchProductDetailsQuery(productId)
    const methods = useForm();
    const Navigate = useNavigate()

    const [EditProduct, { isLoading: isEditingProduct, isSuccess: isSuccessfullEditedProduct }] = useEditProductMutation()

    const fieldObj = useMemo(() => ({
        sizes: <Sizes />,
        stocks: <Stocks isEditingSize={true} colorArray={product.colors ?? []} />
    }), [])

    const onSubmit = useCallback((wholeData) => {

        const checkDirtyField = (field, value) => {
            if (typeof value === 'boolean')
                return value

            let prop = ''
            if (field === 'keyHighlights')
                prop = 'highlight'
            else if (field === 'sizes')
                prop = 'size'

            for (const obj of value) {

                if (obj && obj[prop])
                    return true
            }
            return false
        }

        const data = {}

        for (const field in methods.formState.dirtyFields) {

            const isDirty = methods.formState.dirtyFields[field];

            // check if the field is modified by user
            if (!checkDirtyField(field, isDirty)) {
                continue;
            }

            // only for keyHighlights and sizes do this
            if (field === 'keyHighlights' || field === 'sizes') {
                data[field] = wholeData[field].map((obj) => Object.values(obj)[0])

                // when sizes are modified then stocks must be updated
                if (field === 'sizes')
                    data['stocks'] = wholeData['stocks']
            }
            // for stocks and rest other fields
            else {
                data[field] = wholeData[field]
            }
        }

        // for totalStocks
        if (data.stocks) {
            data.totalStocks = data.stocks.reduce((prevResult, { stock }) => {
                return prevResult + stock
            }, 0)
        }

        if (Object.keys(data).length > 0)
            catchAndShowMessage(EditProduct, { data, id: productId })
    }, [])

    useEffect(() => {
        if (isSuccessfullEditedProduct) {
            methods.reset()
            Navigate(`/product-details/${productId}`)
        }
    }, [isSuccessfullEditedProduct])

    // when the product is properly loaded then set the default value of the form
    useEffect(() => {
        if (product && Object.keys(product).length > 0) {

            const { colors, totalStocks, rating, _id, owner, ...rest } = product

            methods.reset({
                ...rest,
                keyHighlights: product?.keyHighlights?.map((highlight) => ({ highlight })) ??
                    [{ highlight: '' }],
                sizes: product?.sizes?.map((size) => ({ size })) ?? [{ size: '' }],
            })
        }
    }, [product])


    return (
        <Container
            LoadingConditions={[!!isLoadingProduct, !!isEditingProduct]}
            RenderingConditions={[!!product, !!(Object.keys(product).length > 0)]}
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-6 bg-white p-6 rounded-lg shadow-md w-[95%]">

                    {/*form dependent */}
                    <ProductName />

                    {/*form dependent */}
                    <PriceDiscountCategory />

                    {/*form dependent */}
                    <DescriptionDetailsReturnPolicy />

                    {/* form dependent */}
                    <KeyHighlights />

                    {
                        [
                            'sizes',
                            'stocks'
                        ].map((field) => (
                            <div
                                key={field}
                                className="border p-4 rounded-lg space-y-4">
                                <h2
                                    className="text-lg font-semibold">
                                    {field}
                                </h2>
                                {fieldObj[field]}
                            </div>
                        ))
                    }

                    {/* form dependent */}
                    <IsReturnable />

                    <input
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded" />
                </form>
            </FormProvider>
        </Container >
    )
})

export default EditProduct;
