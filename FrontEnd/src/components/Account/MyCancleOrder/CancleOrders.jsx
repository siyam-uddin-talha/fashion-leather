import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import UseGetData from '../../../api/UseGetData'
import OrderComponentsLoading from '../../Loading/OrderComponentsLoading';
import Emety from '../../singleComponents/Emety';
import { Link } from 'react-router-dom';


const CancleOrders = () => {
    const [cancleOrders, setCancleOrders] = useState([])

    const [loading, setloading] = useState(true)

    const GetData = async () => {

        const { data } = await UseGetData('/api/order/my/all-orders')

        try {
            if (data.orders.length !== 0) {
                const cancled = data.orders.filter(e => e.cancle === true)

                let allOrders = []

                cancled.forEach(e => {
                    allOrders.push(...[{ uuid: e._id, cancleOrders: e.orderItems, totalPrice: e.totalPrice }])
                });
                setCancleOrders(allOrders)

                setloading(false)
            } else {
                setloading(false)
                setCancleOrders([])
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

    if (cancleOrders.length === 0) {
        return <Emety title='No Cancellation products' />
    }


    return (
        <Container component="main" maxWidth="md" sx={{ m: '0', marginBottom: '5rem' }} >
            {cancleOrders.map((e, i) => {
                const { uuid, cancleOrders, totalPrice } = e

                return <div className="single_order_wrapper mt-4 bg-w px-3" key={uuid} >

                    <div className="order_branding__">
                        {cancleOrders.map(item => {
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

export default CancleOrders
