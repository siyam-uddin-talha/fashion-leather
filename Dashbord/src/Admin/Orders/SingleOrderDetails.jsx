import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import UseGetData from '../../Hooks/UseGetData'
import UsePutData from '../../Hooks/UsePutData'
import Spinner from '../../components/Loading/Spinner'
import BackDropLoading from '../../components/Loading/BackDropLoading'
import { Button, Container, Typography } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Empty from '../../components/Single/Empty'

const steps = ['pending', 'processing', 'delivered'];

const SingleOrderDetails = () => {
    const { id } = useParams()


    const [singleOrder, setSingleOrder] = useState({})
    const [loading, setloading] = useState(true)
    const [backDropLoading, setbackDropLoading] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [orderStaus, setsetOrderStaus] = useState('processing')


    const GetSingleOrder = useCallback(async () => {
        try {
            const { data } = await UseGetData(`/api/admin/order-single/${id}`)

            if (data.success && data.orders !== null) {
                setSingleOrder(data.orders)
            } else {
                setSingleOrder({})
            }
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }, [id]
    )

    useEffect(() => {
        GetSingleOrder()
    }, [GetSingleOrder])


    useEffect(() => {
        if (singleOrder.orderStatus === 'processing') {
            setActiveStep(1)
        }
        else if (singleOrder.orderStatus === 'delivered') {
            setActiveStep(3)
        }
        else {
            setActiveStep(0)
        }
    }, [singleOrder])


    const handldOrderSatus = async () => {
        setbackDropLoading(true)
        try {
            if (orderStaus === 'delivered') {
                const { data } = await UsePutData(`/api/admin/order-single/${id}`, {
                    orderStatus: orderStaus,
                    paymentInfo: {
                        ...singleOrder.paymentInfo,
                        success: true
                    },
                    deliveredAt: new Date(),
                    purches: true
                })
                GetSingleOrder()
                if (!data.success) {
                    alert("Error Try again")
                }
            } else {
                const { data } = await UsePutData(`/api/admin/order-single/${id}`, {
                    orderStatus: orderStaus,
                })
                GetSingleOrder()
                if (!data.success) {
                    alert("Error Try again")
                }
            }

            setbackDropLoading(false)

        } catch (error) {
            setbackDropLoading(false)
        }
    }


    if (loading) {
        return <Spinner />
    }

    if (Object.keys(singleOrder).length === 0) {
        return <section className='sec-pad bg-w single_product_sector' >
            <Empty title={`No product found #${id}`} />
        </section>
    }

    return (
        <section className='sec-pad'>
            <Container>
                <Container component="main"  >
                    <div className="staper_wrapper">
                        <div className="order_steps">
                            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </div>
                    <div className="update_order_status d-flex gap-3">
                        <div className="title_w">
                            <h5>
                                Update Order Status :
                            </h5>
                        </div>
                        <div className="option_wrapper">
                            <select name="orderStatus" id="orderStatus" onChange={(e) => setsetOrderStaus(e.target.value)} >
                                <option value="processing">
                                    processing
                                </option>
                                <option value="delivered">
                                    delivered
                                </option>
                            </select>
                        </div>
                        <div className="contfinrm_button">
                            <Button onClick={handldOrderSatus} disabled={singleOrder.orderStatus === "delivered" ? true : false} >
                                keep change
                            </Button>
                        </div>
                    </div>

                    <div className="order_branding__">
                        {singleOrder.orderItems.map(item => {
                            const { _id, discountPrice, thumb, price, title, qty, } = item

                            return (<div className="single_order d-flex a-i-c j-c-s-b py-3 px-3 gap-2 bg-light" key={_id} >

                                <div className="single_order d-flex gap-3 touch-gap-2">
                                    <div className="img_container cart_image cart-touch-img touch-img">
                                        <div className='branding_link t-d-n c-black a-hover' >
                                            <img src={thumb} alt="thumb" />

                                        </div>
                                    </div>

                                    <div className="single_order_title d-flex a-i-c">
                                        <div className='branding_link t-d-n c-black a-hover text-upper touch-small' >
                                            {title}
                                        </div>

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

                </Container>
            </Container>
            {backDropLoading && <BackDropLoading />}
        </section>
    )
}

export default SingleOrderDetails
