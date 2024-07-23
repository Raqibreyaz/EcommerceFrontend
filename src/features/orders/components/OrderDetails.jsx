import { useFetchOrderDetailsQuery } from '../orderSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, FailedMessage } from '../../../components/index.js';
import { useCallback, useMemo } from 'react';

const OrderedProductCard = ({ orderedProduct, deliveryStatus, deliveredAt, orderDetails }) => {
    const statusColors = {
        delivered: 'text-green-600',
        pending: 'text-yellow-600',
        cancelled: 'text-red-600',
        returned: 'text-gray-600'
    };

    const Navigate = useNavigate()

    const currentDate = new Date()
    const givenDate = new Date(orderDetails.createdAt)

    const daysDifference = (currentDate - givenDate) / (1000 * 60 * 60 * 24)

    const orderedProductAmount = useMemo(() => (orderedProduct.price - Math.round(orderedProduct.price * orderedProduct.discount / 100)), [orderedProduct])

    const handleReturnOrder = useCallback(
        () => {
            console.log(daysDifference);
            if (daysDifference >= 3)
                FailedMessage('return is only applicable for a period of 3 days')
            else {
                // navigate to return request page
                Navigate(`/return-request-form/${orderDetails._id}/${orderedProduct.product}`, {
                    state: {
                        refundAmount: orderedProductAmount,
                        quantity: orderedProduct.quantity,
                        color: orderedProduct.color,
                        size: orderedProduct.size
                    }
                })
            }
        },
        [orderedProduct, orderDetails],
    )

    const handleReview = useCallback(
        () => {
        Navigate(`review-product/${orderedProduct.product}`, {
            state: { from: `/order-details/${orderDetails._id}` }
        })
    }
        , [orderedProduct, orderDetails])

    return (
        <div className="flex mb-6 border-t pt-4">
            <div className="w-1/5">
                <img
                    src={orderedProduct.image}
                    alt={orderedProduct.product_name}
                    className="w-full h-auto object-cover rounded-md"
                />
            </div>
            <div className="w-4/5 pl-6">
                <p className="text-lg font-semibold capitalize">{orderedProduct.product_name}</p>
                <div className="flex justify-between items-center mb-2 flex-col">
                    <p className="text-lg font-semibold">
                        ₹{orderedProductAmount}
                    </p >
                    <p className="text-lg font-semibold text-gray-400 line-through">₹{orderedProduct.price}</p>
                </div>
                <div>
                    <p className="text-gray-500 mb-4">{orderedProduct.description}</p>
                    {deliveryStatus === 'delivered' && <p className={`flex items-center font-semibold `}>
                        {deliveredAt && <span className="mr-2">✔</span>}
                        {deliveredAt && <span> Delivered on {new Date(deliveredAt).toLocaleString()}</span>}
                    </p>}
                    <span >
                        Status:
                        {orderedProduct.returnStatus !== 'not requested' ?
                            < span className={statusColors[orderedProduct.returnStatus.split(' ')[1]]}> {orderedProduct.returnStatus}</span> :
                            <span className={`${statusColors[deliveryStatus.toLowerCase()]}`}>{deliveryStatus}
                            </span>}
                    </span>
                </div>
                <div className="flex justify-between mt-4">
                    <Link to={`/product-details/${orderedProduct.product}`} className="text-indigo-500 font-semibold hover:text-indigo-700">
                        View product
                    </Link>
                    <div className='space-x-2'>
                        {
                            deliveryStatus === 'delivered' &&
                            orderedProduct.returnStatus === 'not requested' &&
                            <button type='button' onClick={() => handleReturnOrder()} className='text-white p-1 border rounded bg-red-500'>Return Product</button>}

                        {deliveredAt && <button type='button' onClick={handleReview} className='text-white p-1 border rounded bg-yellow-600'>Review Product</button>}
                    </div>
                </div>
            </div>
        </div >
    );
};

const OrdersPage = () => {

    const orderId = useParams().id

    const { data: { orderDetails } = {}, isLoadingOrderDetails } = useFetchOrderDetailsQuery(orderId)

    const orders = [
        {
            orderNumber: 'WU88191111',
            datePlaced: 'Jul 6, 2021',
            totalAmount: '160.00',
            status: 'delivered',
            items: [
                {
                    image: 'https://m.media-amazon.com/images/I/71kZfQA-Y7L._AC_UY218_.jpg',
                    name: 'Micro Backpack',
                    price: '70.00',
                    quantity: 3,
                    size: 'xl',
                    color: 'red',
                    description: 'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
                    deliveryDate: 'July 12, 2021'
                },
                {
                    image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg',
                    name: 'Nomad Shopping Tote',
                    price: '90.00',
                    description: 'This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.',
                    deliveryDate: 'July 12, 2021'
                }
            ]
        }
    ];

    return (
        <Container
            LoadingConditions={[!!isLoadingOrderDetails]}
            RenderingConditions={[!!orderDetails]}
        >
            <div className="min-h-screen bg-gray-50 p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Orders</h1>
                <div className="grid grid-cols-1  gap-8">
                    <div className="bg-white shadow-lg rounded-lg w-full mb-0">
                        <div className="p-6">
                            {/* Order Summary */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-gray-500 text-sm">Order Id</p>
                                    <p className="text-black font-semibold">{orderDetails?._id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Date placed</p>
                                    <p className="text-black font-semibold">{new Date(orderDetails?.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Total amount</p>
                                    <p className="text-black font-semibold">{orderDetails?.totalAmount}</p>
                                </div>
                            </div>
                            {/* Products */}
                            <div>
                                {orderDetails?.products?.map((item, index) => (
                                    <OrderedProductCard key={item.product} orderedProduct={item} deliveryStatus={orderDetails.deliveryStatus} deliveredAt={orderDetails.deliveredAt} orderDetails={orderDetails} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default OrdersPage;
