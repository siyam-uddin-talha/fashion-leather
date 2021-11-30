import { IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, } from 'react-redux'
import { Link } from 'react-router-dom'
import IncreaseDecreaseQty from '../../../components/singleComponents/Increase_DecreaseQty'
import { RiDeleteBin2Line } from "react-icons/ri";

import { AddToCartAction } from '../../../Redux/Actions/AddToCartAction'
import UsePostData from '../../../api/UsePostData'


const CartProductSingle = ({ cart }) => {


    const dispatch = useDispatch()
    const increaseFun = (id) => {
        dispatch({ type: `INCREASE_SPACIFICF_PRODUCT_FROM_CART`, payload: id })
    }
    const decraseFun = (id) => {
        dispatch({ type: `DECRASE_SPACIFICF_PRODUCT_FROM_CART`, payload: id })
    }

    const DeletItFromCart = async (payload) => {
        try {
            const res = await UsePostData('/api/home/cart', payload)
            dispatch(AddToCartAction(res.data.cart.cartItems))

        } catch (error) {
            console.log(error.message)
        }
    }

    const SelectAndPayToProcess = (e, payload) => {
        if (e.currentTarget.checked) {
            dispatch({ type: 'ADD_TO_THE_SELECTED_PRODUCT', payload: payload })
        }
        if (!e.currentTarget.checked) {
            dispatch({ type: 'REMOVE_TO_THE_SELECTED_PRODUCT', payload: payload })

        }

    }



    return (
        <>
            {cart.map(e => {
                const { _id, discountPrice, thumb, price, title, qty, stock, stockCount } = e
                return (<div className="single_cart d-flex a-i-c  border-bottom pb-4 gap-2" key={_id} >
                    <div className="select_cart_product">

                        <input type="checkbox" name="cartItem" id="cart_item_select" onChange={(event) => SelectAndPayToProcess(event, e)} disabled={stock ? false : true} />
                    </div>
                    <div className="delet_this_form_cart">
                        <IconButton
                            size="small"
                            color="error" onClick={() => DeletItFromCart({
                                _id, discountPrice, thumb, price, title, qty, stock, stockCount
                            })} >
                            <RiDeleteBin2Line />

                        </IconButton>
                    </div>
                    <div className="single_cart_branding d-flex gap-3 touch-gap-2">
                        <div className="img_container cart_image cart-touch-img touch-img">
                            <Link to={`/single/product/${_id}`} className='cart_branding_link t-d-n c-black a-hover' >
                                <img src={thumb} alt="thumb" />
                            </Link>
                        </div>
                        <div className="cart_product_title d-flex a-i-c" >

                            <Link to={`/single/product/${_id}`} className='cart_branding_link t-d-n c-black a-hover weight-500 touch-small' style={{ color: `${!stock && '#ff5537'}` }} >

                                {title}

                            </Link>

                        </div>
                    </div>
                    <div className="alwoalvw">

                        <div className="sasfdwsfs px-2 py-1" style={{ background: `${stock ? 'rgb(184 229 184)' : 'rgb(239 145 145)'}`, borderRadius: '.2rem' }} >
                            <span className="weight-500" >
                                {stock ? 'in stock' : 'out stock'}
                            </span>
                        </div>
                    </div>

                    <div className="cart_product_price touch-none" style={{ color: `${!stock && '#ff5537'}` }} >
                        <span>
                            ৳{price - discountPrice}
                        </span>
                    </div>
                    <div className="cart_quntity" style={{ borderColor: `${!stock && 'rgb(239 145 145)'}` }} >
                        <IncreaseDecreaseQty increaseFun={increaseFun} decraseFun={decraseFun} id={_id} qty={qty} />
                    </div>
                    <div className="this_product_total touch-small"  >
                        <span style={{ color: `${!stock && '#ff5537'}` }} >
                            ৳{(price - discountPrice) * qty}
                        </span>
                    </div>
                </div>)
            })}
        </>
    )
}

export default CartProductSingle
