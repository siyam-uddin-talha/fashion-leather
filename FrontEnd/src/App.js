import React from 'react'
import Navbar from './components/Navbar/AppBar';
import { Route, Switch, } from 'react-router-dom';
import LandingHome from './pages/Home/LandingHome';
import SingleProductDetails from './components/Product/SingleProductDetails';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';

import CartProducts from './pages/Busket/Cart/CartProducts';
import WishListProducts from './pages/Busket/Wish/WishListProducts'

import AddressForm from './pages/Busket/Cart/Checkout/AddressForm'
import PaymentForm from './pages/Busket/Cart/Checkout/PaymentForm'
import Review from './pages/Busket/Cart/Checkout/Review'
import OrderSuccess from './pages/Busket/Cart/Checkout/OrderSuccess'

import CartProcessPrivetRoute from './components/PrivateRoute/CartProcess';
import PaymentPrivateRoute from './components/PrivateRoute/PaymentRoute';
import PaymentReviewRoute from './components/PrivateRoute/PaymentReviewRoute';
import AuthPrivateRoute from './components/PrivateRoute/AuthPrivateRoute'
import ChackUser from './components/PrivateRoute/ChackUser'

import MyAccount from './components/Account/MyAccount/App'
import MySettings from './components/Account/MySettings/App'
import MyOrders from './components/Account/MyOrder/App'
import ManageOrder from './components/Account/MyOrder/ManageOrder'
import MyCancleOrder from './components/Account/MyCancleOrder/App'
import Footer from './components/singleComponents/Footer'
import NotLogin from './components/singleComponents/NotLogin'

import SearchProducts from './components/Product/SearchProducts'
import AllCatagorys from './components/Product/AllCatagorys'
import { useLocation } from 'react-router';
import TeamAndCondition from './components/singleComponents/TeamAndCondition'
import ContactUs from './pages/ContactUs/ContactUs'

// import Error from './components/singleComponents/Error'
import FixedScrool from './components/singleComponents/FixedScrool'


const App = () => {


  const { pathname } = useLocation()


  return (

    <Switch>
      <AuthPrivateRoute exact path='/user/login' component={Login} />
      <AuthPrivateRoute exact path='/user/signup' component={SignUp} />
      <AuthPrivateRoute exact path='/user/forget-password' component={ForgetPassword} />
      <AuthPrivateRoute exact path='/user/reset-password/:resetToken' component={ResetPassword} />

      <React.Fragment>
        <FixedScrool />

        <Navbar />

        <Route exact path='/' component={LandingHome} />
        <Route exact path='/single/product/:id' component={SingleProductDetails} />

        <Route exact path='/product/search/:search' component={SearchProducts} />
        <Route exact path='/all/catagorys' component={AllCatagorys} />

        <Route exact path='/my/carts' component={CartProducts} />
        <Route exact path='/my/favorites' component={WishListProducts} />

        <Route exact path='/terms-and-condition' component={TeamAndCondition} />



        <Route exact path='/not/login' component={NotLogin} />
        <Route exact path='/contact-us' component={ContactUs} />

        <ChackUser exact path='/my/account' component={MyAccount} />
        <ChackUser exact path='/my/account/settings' component={MySettings} />
        <ChackUser exact path='/my/account/orders' component={MyOrders} />
        <ChackUser exact path='/my/orders/manage/:id' component={ManageOrder} />
        <ChackUser exact path='/my/account/cancle-products' component={MyCancleOrder} />


        <CartProcessPrivetRoute exact path='/cart/process/checkout/form' component={AddressForm} />
        <PaymentPrivateRoute exact path='/cart/process/payment' component={PaymentForm} />
        <PaymentReviewRoute exact path='/cart/success/review' component={Review} />
        <PaymentReviewRoute exact path='/product/order/success' component={OrderSuccess} />

        {pathname !== '/my/account' && pathname !== '/my/account/settings' && pathname !== '/my/orders/manage/:id' && pathname !== '/my/account/orders' && pathname !== '/my/account/cancle-products' && pathname !== '/cart/process/checkout/form' && pathname !== '/cart/process/payment' && pathname !== '/cart/success/review' && pathname !== '*'
          && <Footer />}

      </React.Fragment>



    </Switch>
  )
}

export default App
