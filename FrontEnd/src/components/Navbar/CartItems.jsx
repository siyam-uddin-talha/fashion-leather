import { Badge, IconButton } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { CgShoppingCart } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UseGetData from '../../api/UseGetData'
import { GetCartItems } from '../../Redux/Actions/AddToCartAction'
import GetBusketProductFail from '../../Redux/Actions/GetBusketProductFail'

const CartItems = () => {

    const dispatch = useDispatch()
    const AddToCartReducer = useSelector(state => state.AddToCartReducer)

    const GetMyCartItems = useCallback(async () => {
        try {
            const res = await UseGetData(`/api/home/cart`)
            if (res) {
                dispatch(GetCartItems(res.data.cart ? res.data.cart.cartItems : []))
            }
            if (res.data.message === 'not login') {
                dispatch(GetBusketProductFail())
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [dispatch]
    )

    useEffect(() => {
        GetMyCartItems()
    }, [GetMyCartItems, dispatch])


    return (
        <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
            <Link to='/my/carts' className='c-gray'>
                <Badge badgeContent={AddToCartReducer.cart.length > 0 ? AddToCartReducer.cart.length : 0} color="primary">
                    <CgShoppingCart />
                </Badge>
            </Link>

        </IconButton>
    )
}

export default CartItems
