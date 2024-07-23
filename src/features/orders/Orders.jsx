import { useCancelOrderMutation, useFetchOrdersQuery } from './orderSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Container, FailedMessage } from '../../components/index.js'
import { Fragment, useCallback } from 'react';
import { catchAndShowMessage } from '../../utils/catchAndShowMessage.js';

const OrderCard = ({ order }) => {

    const statusColors = {
        pending: 'bg-yellow-200 text-yellow-800',
        delivered: 'bg-green-200 text-green-800',
        cancelled: 'bg-red-200 text-red-800',
        returned: 'bg-gray-200 text-gray-800'
    };

    const currentDate = new Date()
    const givenDate = new Date(order.createdAt)

    const hoursDifference = (currentDate - givenDate) / (1000 * 60 * 60)

    const [CancelOrder, { isLoading: isCancellingOrder }] = useCancelOrderMutation()

    const handleCancelOrder = useCallback(
        () => {
            if (hoursDifference >= 3)
                FailedMessage('order cancellation is only applicable within 3 hours of order creation')
            else {
                catchAndShowMessage(CancelOrder, order._id)
            }
        },
        [],
    )


    return (
        <div className="bg-white shadow-lg rounded-lg  mb-4 w-full">
            <div className="p-4">
                {/* Product Images */}
                <div className="flex mb-4 space-x-4 items-end">
                    {order.products.slice(0, 3).map(({ product, image }, index) => (
                        <div className='size-[9vw]'>
                            <img
                                key={product}
                                src={image}
                                alt=''
                                className="size-full rounded-md"
                            />
                        </div>
                    ))}
                    <span className=''>+More</span>
                </div>
                {/* Order Amount and Date */}
                <div className="mb-4 font-semibold text-sm">
                    <p className="text-gray-600 mb-1">Order Amount: ₹{order.totalAmount}</p>
                    <p className="text-gray-600">Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                {/* Order Status */}
                <div className='flex justify-between'>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.deliveryStatus.toLowerCase()]}`}>
                        {order.deliveryStatus}
                    </div>
                    {order.deliveryStatus === 'pending' &&
                        <div>
                            <button type='button' onClick={handleCancelOrder} className='text-sm font-semibold border bg-red-500 text-white p-1 rounded-md'>
                                cancel order
                            </button>
                        </div>}
                </div>
            </div>
            <Link to={`/order-details/${order._id}`} className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <button className="text-blue-500 font-semibold hover:text-blue-700">View Details</button>
            </Link>
        </div >
    );
};

// [
//     {
//       _id: new ObjectId('667c5120be365f8a73a59daf'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object] ],
//       totalPrice: 3499,
//       totalDiscount: 2274.35,
//       totalAmount: 1224.65,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:34:24.235Z,
//       updatedAt: 2024-06-26T17:34:24.235Z,
//       __v: 0
//     },
//     {
//       _id: new ObjectId('667c49fac351c68d6dae7f8b'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object], [Object] ],
//       totalPrice: 4182,
//       totalDiscount: 836.4,
//       totalAmount: 3345.6,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:03:54.611Z,
//       updatedAt: 2024-06-26T17:03:54.611Z,
//       __v: 0
//     }
//   ]
//   [
//     {
//       _id: new ObjectId('667c5120be365f8a73a59daf'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object] ],
//       totalPrice: 3499,
//       totalDiscount: 2274.35,
//       totalAmount: 1224.65,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:34:24.235Z,
//       updatedAt: 2024-06-26T17:34:24.235Z,
//       __v: 0
//     },
//     {
//       _id: new ObjectId('667c49fac351c68d6dae7f8b'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object], [Object] ],
//       totalPrice: 4182,
//       totalDiscount: 836.4,
//       totalAmount: 3345.6,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:03:54.611Z,
//       updatedAt: 2024-06-26T17:03:54.611Z,
//       __v: 0
//     }
//   ]
//   [
//     {
//       _id: new ObjectId('667c5120be365f8a73a59daf'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object] ],
//       totalPrice: 3499,
//       totalDiscount: 2274.35,
//       totalAmount: 1224.65,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:34:24.235Z,
//       updatedAt: 2024-06-26T17:34:24.235Z,
//       __v: 0
//     },
//     {
//       _id: new ObjectId('667c49fac351c68d6dae7f8b'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object], [Object] ],
//       totalPrice: 4182,
//       totalDiscount: 836.4,
//       totalAmount: 3345.6,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:03:54.611Z,
//       updatedAt: 2024-06-26T17:03:54.611Z,
//       __v: 0
//     }
//   ]
//   [
//     {
//       _id: new ObjectId('667c5120be365f8a73a59daf'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object] ],
//       totalPrice: 3499,
//       totalDiscount: 2274.35,
//       totalAmount: 1224.65,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:34:24.235Z,
//       updatedAt: 2024-06-26T17:34:24.235Z,
//       __v: 0
//     },
//     {
//       _id: new ObjectId('667c49fac351c68d6dae7f8b'),
//       userId: new ObjectId('666ca371de8e70b490423d1c'),
//       products: [ [Object], [Object] ],
//       totalPrice: 4182,
//       totalDiscount: 836.4,
//       totalAmount: 3345.6,
//       deliveryAddress: {
//         state: 'dholakpur',
//         city: 'fufurinagar',
//         pincode: 876543,
//         house_no: 'x 19/'
//       },
//       deliveryStatus: 'pending',
//       createdAt: 2024-06-26T17:03:54.611Z,
//       updatedAt: 2024-06-26T17:03:54.611Z,
//       __v: 0
//     }
//   ]


const Orders = () => {


    // Sample orders data within the component
    // const orders = [
    //     {
    //         orderId: '1',
    //         products: [
    //             { image: 'https://m.media-amazon.com/images/I/71kZfQA-Y7L._AC_UY218_.jpg', name: 'Product 1' },
    //             { image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg', name: 'Product 2' },
    //             { image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg', name: 'Product 2' },
    //             { image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg', name: 'Product 2' }
    //         ],
    //         amount: 150,
    //         date: '2023-06-01',
    //         status: 'Pending'
    //     },
    //     {
    //         orderId: '2',
    //         products: [
    //             { image: 'https://m.media-amazon.com/images/I/61pXO4JeKaL._AC_UY218_.jpg', name: 'Product 3' }
    //         ],
    //         amount: 250,
    //         date: '2023-05-15',
    //         status: 'Delivered'
    //     },
    //     // Add more orders as needed
    // ];

    const { data: { orders = [] } = {}, isLoading: isLoadingOrders } = useFetchOrdersQuery()

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-semibold mb-6">Orders</h1>
            <Container
                LoadingConditions={[isLoadingOrders]}
                RenderingConditions={[!!orders, orders.length > 0]}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                backupElem={<h1 className='text-xl font-semibold'>You Have No Orders Yet</h1>}
            >
                {orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </Container >
        </div >
    );
};

export default Orders;
