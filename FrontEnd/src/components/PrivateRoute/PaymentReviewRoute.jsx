import React from 'react'
import { Route } from "react-router"
import { useSelector } from 'react-redux';

const PaymentReviewPrivateRoute = ({ component: Component, ...rest }) => {

    const PaymentReducer = useSelector(state => state.PaymentReducer)

    const AddToCartReducer = useSelector(state => state.AddToCartReducer)

    return (<Route {...rest} render={props => {
        return AddToCartReducer.selectedProducts.length > 0 && PaymentReducer.payment && <Component {...props} />
    }} >
    </Route>)


}

export default PaymentReviewPrivateRoute