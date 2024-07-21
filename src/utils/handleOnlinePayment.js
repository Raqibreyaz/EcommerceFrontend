import { catchAndShowMessage } from "./catchAndShowMessage";

export const handleOnlinePayment = async (user, amount, Razorpay, CreateRazorPayOrder, VerifyRazorPayOrder, callBackHandler) => {

    // Step 1: Create an order on the backend
    const { order: { RAZORPAY_KEY = '', id = '' } = {} } = await catchAndShowMessage(CreateRazorPayOrder, {
        customer_name: user.fullname,
        amount
    }, false);

    // Step 2: Initialize Razorpay Checkout with the order details
    const options = {
        key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount, // Amount in currency subunits
        currency: 'INR',
        name: 'BANARAS MART',
        description: 'Test Transaction',
        image: user.avatar?.url || '',
        order_id: id, // Order ID from backend
        prefill: {
            name: user.fullname,
            email: user.email,
            contact: user.phoneNo
        },
        handler: function (response) {
            console.log(response);
            // Step 3: Verify payment on the backend
            // Step 4: Create the order 
            catchAndShowMessage(VerifyRazorPayOrder, response, false)
                .then((res) => {
                    if (res?.isPaymentVerified)
                        callBackHandler(
                            {
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                paymentMode: 'online',
                                paymentStatus: 'fulfilled'
                            }
                        )
                })
        },
        theme: {
            color: '#0000'
        }
    };

    const razor = new Razorpay(options);

    razor.open();

}