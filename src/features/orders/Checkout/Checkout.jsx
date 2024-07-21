import Cart from '../../cart/Cart'
import AddressForm from './AddressForm'
import PaymentMethods from './PaymentMethods';
import ExistingAddresses from './ExistingAddresses';
import { useForm, FormProvider } from 'react-hook-form';
import { useCreateOrderMutation, useCreateRazorPayOrderMutation, useVerifyRazorPayPaymentMutation } from '../orderSlice';
import { useFetchUserQuery } from '../../user/userSlice';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import { Container } from '../../../components/index';
import { handleOnlinePayment } from '../../../utils/handleOnlinePayment';
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchUserCartQuery } from '../../cart/cartSlice';

export default function Checkout() {

    const { data: { user = null } = {}, isLoading: isLoadingUser } = useFetchUserQuery()

    const { refetch: refetchCart } = useFetchUserCartQuery()

    const [CreateOrder, { isLoading: isLoadingCreateOrder, isSuccess: isSuccessCreateOrder }] = useCreateOrderMutation()

    const [Razorpay] = useRazorpay();

    const [CreateRazorPayOrder, { isLoading: isCreatingRazorPayOrder }] = useCreateRazorPayOrderMutation()

    const [VerifyRazorPayOrder, { isLoading: isVerifyingRazorPayOrder }] = useVerifyRazorPayPaymentMutation()

    const onSubmit = async (data) => {
        // will request to save the order in the database
        const OrderHandler = (paymentDetails) => {

            delete data.paymentMode

            data.paymentDetails = paymentDetails

            catchAndShowMessage(CreateOrder, data)
        }

        // order will only be created when there is any product i cart
        if (data.products?.length > 0) {
            // when payment mode is online then a utitlity used for handling the online transaction
            if (data.paymentMode === 'online') {
                handleOnlinePayment(user, data.totalAmount, Razorpay, CreateRazorPayOrder, VerifyRazorPayOrder, OrderHandler)
            }
            // when payment is cash then just create order
            else {
                OrderHandler({ paymentMode: 'cash on delivery', paymentStatus: 'pending' })
            }
        }
    };

    const methods = useForm()

    const Navigate = useNavigate()

    useEffect(() => {

        if (isSuccessCreateOrder) {
            refetchCart()
            Navigate('/orders')
        }
    }, [isSuccessCreateOrder])

    return (
        <Container
            className='my-10'
            LoadingConditions={[isLoadingCreateOrder, isLoadingUser, isCreatingRazorPayOrder, isVerifyingRazorPayOrder]}
            RenderingConditions={[!!user]}
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='bg-white p-5 border-b ' >
                    <div className="">
                        <AddressForm />
                        <ExistingAddresses addresses={user.addresses} />
                        <PaymentMethods />
                    </div>
                    <div><Cart inCheckout={true} /></div>
                    <button type='submit' className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 capitalize mt-6">Confirm Order</button>
                </form>
            </FormProvider>
        </Container>
    )
}
