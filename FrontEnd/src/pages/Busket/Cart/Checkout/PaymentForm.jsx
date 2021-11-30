import React, { useState } from 'react';
import ShowSmallAlert from '../../../../components/singleComponents/ShowSmallAlert'
import LoadingButton from '@mui/lab/LoadingButton';

import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements, } from '@stripe/react-stripe-js';
import UsePostData from '../../../../api/UsePostData';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import ChackOut from './ChackOut';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import BackDropLoading from '../../../../components/Loading/BackDropLoading';



const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory()

    const AddToCartReducer = useSelector(state => state.AddToCartReducer)

    const [paymentIsIncompleate, setPaymentIsIncompleate] = useState({
        client_secret: '',
        _id: ''
    })

    const [message, setMessage] = useState({
        open: false,
        message: ''
    })

    const [loading, setLoading] = useState(false)


    const [buttonDisable, setbuttonDisable] = React.useState({
        process: false,
        next: true,
    });

    const [paymentMethod, setPaymentMethod] = React.useState('card');
    const dispatch = useDispatch()


    const amount = AddToCartReducer.selectedProducts.filter(e => e.stock === true).reduce((acc, e) => acc + e.qty * (e.price - e.discountPrice), 0) + AddToCartReducer.shippingPrice




    const HandleUserPaymentMethod = (e) => {
        if (e.currentTarget.value === 'cod') {
            setPaymentMethod('cod')
            setbuttonDisable({
                ...buttonDisable,
                next: false
            })
        }
        else if (e.currentTarget.value === 'card') {
            setPaymentMethod('card')
            setbuttonDisable({
                ...buttonDisable,
                next: true
            })
        }
    }


    const shippingInfo = sessionStorage.getItem('userForm') ? JSON.parse(sessionStorage.getItem('userForm')) : {}


    const SetToSessionStorage = (data) => {
        // the product what user order
        sessionStorage.setItem('order', JSON.stringify(data.order.orderItems))

        // total price of the user billing
        sessionStorage.setItem('totalPrice', JSON.stringify(data.order.totalPrice))

        // total price of the user billing
        sessionStorage.setItem('orderNumber', JSON.stringify(data.order._id))

        const { success, method, brand } = data.order.paymentInfo
        // users billing information
        sessionStorage.setItem('paymentInfo', JSON.stringify({ success, method, brand }))

        // set the shipping information
        sessionStorage.setItem('shippingInfo', JSON.stringify({ ...data.order.shippingInfo, shippingPrice: data.order.shippingPrice }))

    }

    const HandleNext = async () => {
        setLoading(true)
        if (paymentMethod === 'cod') {
            try {
                const {
                    address,
                    city,
                    state,
                    zip,
                    note,
                    phoneNo } = shippingInfo


                const { data } = await UsePostData('/api/payment/cash-on-delevary', {
                    order: {
                        orderItems: AddToCartReducer.selectedProducts, shippingInfo:
                        {
                            address, city, state, zip, note, phoneNo
                        },
                        shippingPrice: AddToCartReducer.shippingPrice,
                        timeStamp: new Date().getTime(),
                        totalPrice: amount,
                        paymentInfo: {
                            method: 'cod',
                        }
                    }
                })

                SetToSessionStorage(data)
                setLoading(false)
                dispatch({ type: 'PAYMENT_SUCCESS' })

            } catch (error) {
                setLoading(false)

                setMessage({
                    open: true,
                    message: `${'Error occur in payment! Try again'}`
                })
            }
        }
    }




    const handleStripePayment = async (event) => {
        event.preventDefault();


        if (elements === null) {
            return;
        }


        const payMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!payMethod.error) {
            setbuttonDisable({
                ...buttonDisable,
                process: true
            })
            setLoading(true)

            try {

                const {
                    address,
                    city,
                    state,
                    zip,
                    note,
                    phoneNo } = shippingInfo


                const { data } = await UsePostData('/api/payment/stripe/payment', {
                    amount: amount * 100, // multipy by 100 for corvert into "sent"
                    order: {
                        orderItems: AddToCartReducer.selectedProducts, shippingInfo:
                        {
                            address, city, state, zip, note, phoneNo
                        },
                        shippingPrice: AddToCartReducer.shippingPrice,
                        timeStamp: new Date().getTime(),
                        totalPrice: amount,
                        paymentInfo: {
                            method: payMethod.paymentMethod.type,
                            brand: payMethod.paymentMethod.card.brand,
                        }
                    }
                })


                const { client, order } = data


                const { fullName, email, client_secret } = client

                const confirmpay = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: fullName,
                            email,
                            address: {
                                state,
                                postal_code: zip,
                                line1: address
                            }

                        }
                    },
                })




                if (confirmpay) {
                    if (confirmpay.error && confirmpay.error.code === `payment_intent_authentication_failure`) {

                        setPaymentIsIncompleate({
                            client_secret,
                            _id: order._id,
                            client
                        })
                        setbuttonDisable({
                            ...buttonDisable,
                            process: false
                        })
                        dispatch({ type: 'PAYMENT_FAIL' })
                        setLoading(false)

                    } else {

                        const { data } = await UsePostData(`/api/payment/stripe/payment/update-status/${order._id}`, {
                            paymentInfo: {
                                success: true,
                                method: payMethod.paymentMethod.type,
                                client_secret: client_secret,
                                brand: payMethod.paymentMethod.card.brand,
                                paidAt: new Date(),
                                id: confirmpay.paymentIntent.id
                            }
                        })

                        SetToSessionStorage(data)

                        setbuttonDisable({
                            ...buttonDisable,
                            process: true,
                            next: false
                        })
                        setTimeout(() => {
                            dispatch({ type: 'PAYMENT_SUCCESS' })

                        }, 1000)
                        setLoading(false)

                    }

                }

            } catch (error) {
                setbuttonDisable({
                    ...buttonDisable,
                    process: false,
                    next: true
                })
                setMessage({
                    open: true,
                    message: `${'Error occur in payment! Try again'}`
                })
                setLoading(false)

            }
        } else {
            setMessage({
                open: true,
                message: `${'Error occur in payment! Try again'}`
            })
        }
    };


    const handlePaymentConfirm = async (e) => {
        e.preventDefault();

        try {
            const payMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });


            if (payMethod.error) {
                return;
            }
            else if (!payMethod.error) {
                setbuttonDisable({
                    ...buttonDisable,
                    process: true,
                    next: true
                })
                setLoading(true)

                try {
                    const _confirmPay = await stripe.confirmCardPayment(paymentIsIncompleate.client_secret, {
                        payment_method: {
                            card: elements.getElement(CardElement),
                        },
                        billing_details: {
                            name: paymentIsIncompleate.client.fullName,
                            email: paymentIsIncompleate.client.email,


                        }
                    })


                    if (_confirmPay) {
                        if (_confirmPay.error && _confirmPay.error.code === `payment_intent_authentication_failure`) {
                            setbuttonDisable({
                                ...buttonDisable,
                                process: false
                            })
                            dispatch({ type: 'PAYMENT_FAIL' })
                            setLoading(false)

                        } else {
                            const { data } = await UsePostData(`/api/payment/stripe/payment/update-status/${paymentIsIncompleate._id}`, {
                                paymentInfo: {
                                    success: true,
                                    method: payMethod.paymentMethod.type,
                                    client_secret: paymentIsIncompleate.client_secret,
                                    brand: payMethod.paymentMethod.card.brand,
                                    paidAt: new Date(),
                                    id: _confirmPay.paymentIntent.id

                                }
                            })
                            if (data.success) {

                                SetToSessionStorage(data)
                                setbuttonDisable({
                                    ...buttonDisable,
                                    process: true,
                                    next: false
                                })
                                setLoading(false)

                                setPaymentIsIncompleate('')
                                setTimeout(() => {
                                    dispatch({ type: 'PAYMENT_SUCCESS' })

                                }, 1000)
                                setLoading(false)
                            } else {
                                setbuttonDisable({
                                    ...buttonDisable,
                                    process: false,
                                    next: false
                                })
                            }
                        }
                    }






                } catch (error) {
                    setbuttonDisable({
                        ...buttonDisable,
                        process: false,
                        next: true
                    })
                    setMessage({
                        open: true,
                        message: `${'Re-paiment is fail! Try again'}`
                    })
                    setLoading(false)

                }
            }

        } catch (error) {
            setMessage({
                open: true,
                message: `${'Error'}`
            })
        }

    }

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                    <ChackOut activeStep={1} />
                    <div className="chose_user_option mb-5">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Payment Method</FormLabel>
                            <RadioGroup
                                aria-label="Payment Method"
                                defaultValue="card"
                                name="radio-buttons-group"
                                onChange={HandleUserPaymentMethod}
                            >
                                <FormControlLabel value="cod" control={<Radio />} label="Cash on delevery" />
                                <FormControlLabel value="card" control={<Radio />} label="Card" />
                            </RadioGroup>
                        </FormControl>

                    </div>

                    {paymentMethod === 'card' && <form >
                        <CardElement />

                        {paymentIsIncompleate.client_secret ?

                            (<LoadingButton loading={buttonDisable.process}
                                type="button"
                                onClick={handlePaymentConfirm}
                                variant='text' color='error'
                                fullWidth className='mt-4'>
                                Your payment is not done! click to pay {amount}
                            </LoadingButton>)
                            :
                            (<LoadingButton loading={buttonDisable.process}
                                type="button"
                                onClick={handleStripePayment}
                                variant='outlined'
                                fullWidth className='mt-4'>
                                Pay ৳{amount}
                            </LoadingButton>)}
                    </form>}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button
                            disabled={buttonDisable.input}
                            variant="outlined"
                            onClick={() => history.push('/cart/process/checkout/form')}
                            sx={{ mt: 3, ml: 1 }}

                        >
                            previous
                        </Button>

                        <Button
                            disabled={buttonDisable.next}
                            variant="outlined"
                            onClick={HandleNext}
                            sx={{ mt: 3, ml: 1 }}

                        >
                            next
                        </Button>
                    </Box>

                </Paper>
            </Container>
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            {loading && <BackDropLoading />}
        </>
    );
};

const stripePromise = loadStripe(`pk_test_51Js97hDJVgQGFCMTnWyILouEcXHHpaYgGQlFfBrr77HehhOUsHePuVXDqJqI2jaQkhBKeVoEo8Kks5Z9JVbdkFXH00y7RYDN3k`);

const App = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);
export default App