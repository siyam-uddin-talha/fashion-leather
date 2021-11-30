import { combineReducers } from "redux";
import User from './Reducer/UserReducer';
import SingleProductReducer from './Reducer/SingleProductReducer'
import AllProductReducer from './Reducer/AllProductReducer'
import AddToCartReducer from './Reducer/CartReducer'
import AddToFavoriteReducer from './Reducer/AddToFavReducer'
import NotificationReducer from './Reducer/NotificationReducer'
import PaymentReducer from './Reducer/PaymentReducer';

const RootReducer = combineReducers({ User, SingleProductReducer, AllProductReducer, AddToCartReducer, AddToFavoriteReducer, PaymentReducer, NotificationReducer })

export default RootReducer