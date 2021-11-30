import React, { useState, useEffect } from 'react'
// import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import UseGetData from '../../../api/UseGetData';
import { Link } from 'react-router-dom';
import OrderComponentsLoading from '../../Loading/OrderComponentsLoading';
import Emety from '../../singleComponents/Emety';

const MyOrdersComponent = () => {

    const [orders, setOrders] = useState([])
    const [loading, setloading] = useState(true)

    const GetData = async () => {

        try {
            const { data } = await UseGetData('/api/order/my/all-orders')

            if (data.orders.length !== 0) {
                const notCancled = data.orders.filter(e => e.cancle !== true)

                let allOrders = []

                notCancled.forEach(e => {
                    allOrders.push(...[{ uuid: e._id, orders: e.orderItems, totalPrice: e.totalPrice }])
                });
                setOrders(allOrders)

                setloading(false)
            } else {
                setloading(false)
                setOrders([])
            }
        } catch (error) {
            setloading(true)
        }

    }
    useEffect(() => {
        GetData()
    }, [])



    if (loading) {
        return <OrderComponentsLoading />
    }

    if (orders.length === 0) {
        return <Emety title='You did not order any product' />
    }

    return (
        <Container component="main" maxWidth="md" sx={{ m: '0' }} >
            {orders.map((e, i) => {
                const { uuid, orders, totalPrice } = e

                return <div className="single_order_wrapper mt-4 bg-w px-3" key={uuid} >
                    <div className="manage_box d-flex j-c-f-e a-i-c border-bottom py-2 px-3">
                        <div className="order_product_price">
                            <span>
                                <Link to={`/my/orders/manage/${uuid}`} className='t-d-n a-hover' >
                                    Manage Order
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="order_branding__">
                        {orders.map(item => {
                            const { _id, thumb, title, qty, } = item

                            return (<div className="single_order d-flex a-i-c j-c-s-b py-3 gap-2" key={_id} >

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
                                        ৳{totalPrice}
                                    </span>
                                </div>

                                <div className="order_product_price">
                                    <span>
                                        Qty {qty}
                                    </span>
                                </div>
                            </div>)
                        }).reverse()}
                    </div>
                </div>


            })}
        </Container>

    )
}

export default MyOrdersComponent
