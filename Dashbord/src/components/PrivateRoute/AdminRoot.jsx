import React from 'react'
import { Redirect, Route } from "react-router"
import { useSelector } from 'react-redux';

const UserPrivateRoute = ({ component: Component, ...rest }) => {


    const { admin, } = useSelector(state => state.AdminReducer)


    return (<Route {...rest} render={props => {
        return admin ? <Component {...props} /> : <Redirect to='/admin/login' />
    }} >
    </Route>)


}

export default UserPrivateRoute