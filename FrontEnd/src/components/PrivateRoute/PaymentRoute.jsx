import React from 'react'
import { Redirect, Route } from "react-router"
import { useSelector } from 'react-redux';

const PaymentPrivateRoute = ({ component: Component, ...rest }) => {

    const PaymentReducer = useSelector(state => state.PaymentReducer)

    const AddToCartReducer = useSelector(state => state.AddToCartReducer)

    return (<Route {...rest} render={props => {
        return AddToCartReducer.selectedProducts.length > 0 && PaymentReducer.payment ? <Redirect to='/cart/success/review' /> : <Component {...props} />
    }} >
    </Route>)


}

export default PaymentPrivateRoute