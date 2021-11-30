import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ShowSmallAlert from '../../../components/singleComponents/ShowSmallAlert'


const CartSummery = () => {
    const history = useHistory()
    const AddToCartReducer = useSelector(state => state.AddToCartReducer)


    const [message, setMessage] = useState({
        open: false,
        message: ''
    })

    const TakeToThCheckOut = () => {
        if (AddToCartReducer.selectedProducts.length === 0) {
            setMessage({
                open: true,
                message: 'please select any item'
            })
        } else {
            history.push('/cart/process/checkout/form')
        }
    }


    return (
        <>

            <div className='cart_summery_container d-flex f-d-c gap-3' >
                <div className="subtotal_display_ d-flex j-c-s-b ">
                    <span className="branding_sub_total text-upper">
                        <b>  subtotal</b>
                    </span>
                    <span className="text-upper">
                        ৳{AddToCartReducer.selectedProducts.filter(e => e.stock === true).reduce((acc, e) => acc + e.qty * (e.price - e.discountPrice), 0)}
                    </span>
                </div>
                <div className="shipping_information d-flex j-c-s-b">
                    <span className="branding_shipping_title text-upper">
                        <b>shipping</b>
                    </span>
                    <div className="shiipng_cost_details d-flex f-d-c">
                        <span>
                            ৳100
                        </span>
                        <span className="note_the_const">
                            * only for Dhaka and nearby areas <br />
                            * You can change your area/state in next step
                        </span>
                    </div>
                </div>
                <div className="total_calculate mt-4 border-top">

                    <div className="d-flex j-c-s-b pt-4">
                        <span className="text-upper">
                            <b>  Total </b>
                        </span>
                        <span className="text-upper">
                            ৳{AddToCartReducer.selectedProducts.length > 0 ? AddToCartReducer.selectedProducts.filter(e => e.stock === true).reduce((acc, e) => acc + e.qty * (e.price - e.discountPrice), 0) + 100 : 0}
                        </span>
                    </div>
                </div>
                <div className="process_to_pay_wrapper pb-4 pt-3">
                    <Button variant='outlined' color='primary' fullWidth onClick={() => TakeToThCheckOut()} >
                        process to pay
                    </Button>
                </div>
            </div>
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
        </>
    )
}

export default CartSummery
