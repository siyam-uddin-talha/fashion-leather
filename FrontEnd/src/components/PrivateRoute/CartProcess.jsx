import React from 'react'
import { Redirect, Route } from "react-router"
import { useSelector } from 'react-redux';

const CartProcessPrivetRoute = ({ component: Component, ...rest }) => {
    const AddToCartReducer = useSelector(state => state.AddToCartReducer)

 
    return (<Route {...rest} render={props => {
        return AddToCartReducer.selectedProducts.length > 0 ? <Component {...props} /> : <Redirect to='/my/carts' />
    }} >
    </Route>)


}

export default CartProcessPrivetRoute