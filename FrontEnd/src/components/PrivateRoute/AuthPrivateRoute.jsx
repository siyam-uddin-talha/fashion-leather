import React from 'react'
import { Redirect, Route } from "react-router"
import { useSelector } from 'react-redux';

const AuthPrivate = ({ component: Component, ...rest }) => {

    const { login } = useSelector(state => state.User)


    return (<Route {...rest} render={props => {
        return !login ? <Component {...props} /> : <Redirect to='/' />
    }} >
    </Route>)
}

export default AuthPrivate