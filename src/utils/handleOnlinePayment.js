import { catchAndShowMessage } from "./catchAndShowMessage";
import useRazorpay from "react-razorpay";

export const handleOnlinePayment = async (user, amount) => {

    const [Razorpay] = useRazorpay();
    const [VerifyRazorPayOrder, isVerifyingRazorPayOrder] = useVerifyRazorPayPaymentMutation()
    const [CreateRazorPayOrder, { isLoading: isCreatingRazorPayOrder }] = useCreateRazorPayOrderMutation()


    // Step 1: Create an order on the backend
    const razorpayOrderDetails = await catchAndShowMessage(CreateRazorPayOrder, {
        customer_name: user.fullname,
        amount
    }, false);

    // Step 2: Initialize Razorpay Checkout with the order details
    const options = {
        key: razorpayOrderDetails.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: razorpayOrderDetails.amount, // Amount in currency subunits
        currency: 'INR',
        name: 'BANARAS MART',
        description: 'Test Transaction',
        image: 'https://your-logo-url.com',
        order_id: razorpayOrderDetails.id, // Order ID from backend
        prefill: {
            name: user.fullname,
            email: user.email,
            contact: user.phoneNo
        },
        theme: {
            color: '#3399cc'
        }
    };

    const razor = new Razorpay(options);

    return new Promise((resolve) => {
        razor.open();
        razor.on('payment.failed', () => {
            resolve(false);
        });
        razor.on('payment.success', async function (response) {
            // Step 3: Verify payment on the backend
            let { isPaymentVerified = false } = await catchAndShowMessage(VerifyRazorPayOrder, response, false) ?? {}
            resolve(isPaymentVerified)
        });
    });
}