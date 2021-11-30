import React, { useCallback, useEffect } from 'react'
import './style/app.css'
import { Route, Switch, } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import HomeDashBord from './components/Dashbord/index'
import DialPad from './components/Single/DialPad'
import { useDispatch, useSelector } from 'react-redux'
import UseGetData from './Hooks/UseGetData'
import Spinner from './components/Loading/Spinner'
import Login from './components/Auth/Login'
import AdminRoot from './components/PrivateRoute/AdminRoot'
import { useLocation } from 'react-router'
import AddAdmin from './components/Auth/AddAdmin'
import AddNewProducts from './Admin/Products/AddNewProducts'
import SingleOrderDetails from './Admin/Orders/SingleOrderDetails'
import SuccessOrder from './components/Dashbord/SuccessOrder'
import DisplayProduct from './Admin/Products/DisplayProduct'
import EditSingleProducts from './Admin/Products/EditSingleProducts'


const App = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { loading } = useSelector(state => state.AdminReducer)

  const GetAdmin = useCallback(async () => {
    try {
      const { data } = await UseGetData('/api/admin/all-orders')
      if (!data.success) {
        dispatch({ type: 'ADMIN_LOGIN_FAIL' })
      } else {
        dispatch({ type: 'ADMIN_LOGIN_SUCCESS' })
        dispatch({ type: 'LOGIN_SUCCESS_AND_ORDERS', payload: data.orders })
      }
    } catch (error) {

    }
  }, [dispatch]
  )

  useEffect(() => {
    GetAdmin()
  }, [GetAdmin])

  if (loading) {
    return <Spinner />
  }


  return (
    <>
      {pathname !== '/admin/login' && pathname !== '/admin/register' && <Navbar />}
      {pathname !== '/admin/login' && pathname !== '/admin/register' && <DialPad />}
      <Switch>
        <AdminRoot exact path="/" component={HomeDashBord} />
        <Route exact path="/admin/login" component={Login} />
        <AdminRoot exact path="/admin/register" component={AddAdmin} />
        <AdminRoot exact path="/create-new/product" component={AddNewProducts} />
        <AdminRoot exact path="/order/sucess" component={SuccessOrder} />
        <AdminRoot exact path="/single-order/details/:id" component={SingleOrderDetails} />
        <AdminRoot exact path="/all-products" component={DisplayProduct} />
        <AdminRoot exact path="/single/product/edit/:id" component={EditSingleProducts} />
      </Switch>
    </>
  )
}

export default App
