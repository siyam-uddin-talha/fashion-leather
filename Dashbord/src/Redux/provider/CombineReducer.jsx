import { combineReducers } from "redux"
import AdminReducer from '../Reducer/AdminReducer'
import ProductReducer from '../Reducer/ProductReducer'

const RootReducer = combineReducers({ AdminReducer, ProductReducer })

export default RootReducer