import React, { useState, useEffect, useCallback } from 'react'
import { Button, Container, Typography, IconButton } from '@mui/material'
import UseGetData from '../../../api/UseGetData'
import { useParams } from 'react-router'
import BackDropLoading from '../../Loading/BackDropLoading';
import SideTabs from '../SideBar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Link } from 'react-router-dom';
import ChangeOrderForm from './ChangeOrderForm';
import CancleOrder from './CancleOrder';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { BiErrorCircle } from "react-icons/bi";
import UsePostData from '../../../api/UsePostData';

const steps = ['pending', 'processing', 'delevared'];


const ManageOrder = () => {
    const { id } = useParams()

    const [singleOrder, setSingleOrder] = useState({})
    const [loading, setloading] = useState(true)

    const [addressForm, setAddressForm] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const [activeStep, setActiveStep] = useState(0)


    const GetData = useCallback(async () => {
        try {
            const { data } = await UseGetData(`/api/order/my/orders/${id}`)
            setSingleOrder(data.orders)
            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error.message)
        }
    }, [id]
    )



    useEffect(() => {
        GetData()
    }, [GetData])

    useEffect(() => {
        if (singleOrder.orderStatus === 'processing') {
            setActiveStep(1)
        }
        if (singleOrder.orderStatus === 'delivered') {
            setActiveStep(3)
        }
    }, [singleOrder])

    const confirmPayment = async () => {
        try {
            const { data } = await UsePostData(`/api/payment/stripe/payment/update-status/${singleOrder.paymentInfo.id}`, {
                paymentInfo: {
                    success: true,
                }
            })
            console.log(data)

        } catch (error) {
            console.log(error)

        }
    }

    if (loading) {
        return <BackDropLoading />
    }


    return (
        <section className='daswe'>
            <Container maxWidth="xl" sx={{ py: 4 }} >
                <div className="row">
                    <SideTabs item={2} />


                    <Container className="mangag_order_wrapper" component="main" maxWidth="md" >
                        <div className="order_steps">
                            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                        <div className="order_branding__">
                            {singleOrder.orderItems.map(item => {
                                const { _id, discountPrice, thumb, price, title, qty, } = item

                                return (<div className="single_order d-flex a-i-c j-c-s-b pb-4 gap-2" key={_id} >

                                    <div className="single_order d-flex gap-3 touch-gap-2">
                                        <div className="img_container cart_image cart-touch-img touch-img">
                                            <Link to={`/single/product/${_id}`} className='branding_link t-d-n c-black a-hover' >
                                                <img src={thumb} alt="thumb" />
                                            </Link>
                                        </div>

                                        <div className="single_order_title d-flex a-i-c">
                                            <Link to={`/single/product/${_id}`} className='branding_link t-d-n c-black a-hover text-upper touch-small' >
                                                {title}
                                            </Link>

                                        </div>
                                    </div>

                                    <div className="this_product_total touch-small">
                                        <span>
                                            ৳{(price - discountPrice) * qty}
                                        </span>
                                    </div>

                                    <div className="order_product_price">
                                        <span>
                                            Qty {qty}
                                        </span>
                                    </div>
                                </div>)
                            })}
                        </div>


                        <div className="cancleOrder__">
                            <div className="d-flex j-c-s-b">
                                <div className="confirm_cart_payment">

                                    {(singleOrder.paymentInfo.method === 'card' && singleOrder.paymentInfo.success === false) &&
                                        <Button color="error" component="span" variant='outlined' onClick={confirmPayment} >
                                            Confirm you order
                                        </Button>}

                                </div>
                                <div className="cancelButton_Container">
                                    {(singleOrder.timeStamp + 86400000) < Date.now() ?
                                        <Tooltip title="You can't cancel your order after 1 day" arrow  >
                                            <span>
                                                <IconButton color="warning" variant='outlined' size="small" component="span" disabled >
                                                    <BiErrorCircle /> cancle
                                                </IconButton>
                                            </span>
                                        </Tooltip> : <Button color="primary" component="span" className='bt-pin' onClick={() => setDialogOpen(true)}>
                                            cancle
                                        </Button>}
                                </div>


                            </div>
                        </div>

                        {(singleOrder.paymentInfo.method === 'card' && singleOrder.paymentInfo.success === false) && <div className='mt-4' >
                            <Alert severity="error">Please confirm you your payment unless your product will be not shipped</Alert>
                        </div>}

                        <div className="product_address_total_summery d-flex j-c-s-b gap-3 f-w-w mt-4">

                            <div className="addres__branding col-md-5 col-11 bg-w-s pt-3 px-3 ">

                                <div className="payment_menthods_info mb-2 pb-2 border-bottom">
                                    Payment : <b> {singleOrder.paymentInfo.method}</b>
                                </div>

                                <div className="shipping_information_address">
                                    <div className="addrress_title">
                                        <h6>
                                            Shpping address
                                        </h6>
                                    </div>
                                    <div className="address__">
                                        <Typography gutterBottom>{`${singleOrder.shippingInfo.address} ${singleOrder.shippingInfo.city} ${singleOrder.shippingInfo.state} ${singleOrder.shippingInfo.zip}`}</Typography>

                                        <Typography sx={{ mt: 1 }} >{`phone : ${singleOrder.shippingInfo.phoneNo}`}</Typography>
                                    </div>
                                    <div className="edit_address_button d-flex j-c-f-e">
                                        <Button color="primary" component="span" className='change_address bt-pin' onClick={() => setAddressForm(!addressForm)}>
                                            edit
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            <div className="total_summery_branding col-md-5 col-11 bg-w-s py-3 px-3">
                                <div className='cart_summery_container d-flex f-d-c gap-3' >
                                    <div className="subtotal_display_ d-flex j-c-s-b ">
                                        <span className="branding_sub_total text-upper">
                                            <b>  subtotal</b>
                                        </span>
                                        <span className="text-upper">
                                            ৳{singleOrder.orderItems.reduce((acc, e) => acc + e.qty * (e.price - e.discountPrice), 0)}
                                        </span>
                                    </div>
                                    <div className="shipping_information d-flex j-c-s-b">
                                        <span className="branding_shipping_title text-upper">
                                            <b>shipping</b>
                                        </span>
                                        <div className="shiipng_cost_details d-flex f-d-c">
                                            <span>
                                                {singleOrder.shippingPrice}
                                            </span>

                                        </div>
                                    </div>
                                    <div className="total_calculate mt-4 border-top">

                                        <div className="d-flex j-c-s-b pt-4">
                                            <span className="text-upper">
                                                <b>  Total </b>
                                            </span>
                                            <span className="text-upper">
                                                ৳{singleOrder.totalPrice}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {addressForm && <ChangeOrderForm shippingInfo={singleOrder.shippingInfo} id={id} />}
                    </Container>
                </div>
            </Container>
            <CancleOrder dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} id={id} cardId={singleOrder.paymentInfo.id ? singleOrder.paymentInfo.id : ''} />
        </section>
    )
}

export default ManageOrder
