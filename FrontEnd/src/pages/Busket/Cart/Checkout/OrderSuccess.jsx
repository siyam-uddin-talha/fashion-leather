import React from 'react'
import { Button, Container, Paper, Typography } from '@mui/material'
import ChackOut from './ChackOut';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccess = () => {

    const orderNumber = sessionStorage.getItem('orderNumber') ? JSON.parse(sessionStorage.getItem('orderNumber')) : ""


    const BackToHome = () => {
        //removeing all item if it exixt
        sessionStorage.removeItem('order')
        sessionStorage.removeItem('totalPrice')
        sessionStorage.removeItem('paymentInfo')
        sessionStorage.removeItem('shippingInfo')
        sessionStorage.removeItem('orderNumber')
        sessionStorage.removeItem('userForm')
        window.location = '/'
    }

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }} className='order_succer_container' >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <ChackOut activeStep={3} />
                    <React.Fragment>
                        <div className="success_branding d-flex j-c-c a-i-c f-d-c mb-3">
                            <div className="cheack_wrapper pb-4">
                                <FiCheckCircle />
                            </div>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                        </div>
                        <Typography variant="subtitle1">
                            Your order number is <b>#{orderNumber}</b> . We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </React.Fragment>
                    <div className="go_to_home_button mt-4 mb-4 d-flex j-c-c">
                        <Button onClick={BackToHome} variant='outlined' >
                            Home
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    )
}

export default OrderSuccess
