import Cart from '../../cart/Cart'
import AddressForm from './AddressForm'
import PaymentMethods from './PaymentMethods';
import ExistingAddresses from './ExistingAddresses';
import { useForm, FormProvider } from 'react-hook-form';
import { useFetchUserCartQuery } from '../../cart/cartSlice';
import { useCreateOrderMutation } from '../orderSlice';
import { useFetchUserQuery } from '../../user/userSlice';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import { Container } from '../../../components/index';

export default function Checkout() {

    const { data: { user = null } = {}, isLoading: isLoadingUser } = useFetchUserQuery()
    const { data: { userCart = [] } = {}, isLoading: isLoadingUserCart } = useFetchUserCartQuery()
    const [CreateOrder, { isLoading: isLoadingCreateOrder }] = useCreateOrderMutation()

    const onSubmit = (data) => {

        delete data.deliveryAddress.name
        delete data.deliveryAddress.id

        data.deliveryAddress = JSON.stringify(data.deliveryAddress)
        data.totalPrice = 0
        data.totalDiscount = 0
        data.totalAmount = 0

        // calculating the total price and discount
        userCart.forEach(product => {
            data.totalPrice += product.price
            data.totalDiscount += product.price * product.discount / 100
        });

        data.totalAmount = data.totalPrice - data.totalDiscount

        data.products = userCart.map(({ product, product_name, quantity, size, color, price, discount, image }) => (
            { product, discount, image, size, color, price, product_name, quantity }
        ))

        catchAndShowMessage(CreateOrder, data)
    }

    const methods = useForm()

    const { handleSubmit, control } = methods

    return (
        <Container
            className='my-10'
            LoadingConditions={[isLoadingCreateOrder, isLoadingUser, isLoadingUserCart]}
            RenderingConditions={[!!user, userCart.length > 0]}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-5 border-b ' >
                    <div className="">
                        <AddressForm />
                        <ExistingAddresses addresses={user.addresses} user={user} control={control} />
                        <PaymentMethods control={control} />
                    </div>
                    <div><Cart inCheckout={true} /></div>
                    <button type='submit' className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 capitalize mt-6">Confirm Order</button>
                </form>
            </FormProvider>
        </Container>
    )
}
