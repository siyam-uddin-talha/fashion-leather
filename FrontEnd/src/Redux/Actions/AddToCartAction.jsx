import { ADD_TO_CART, GET_CART_PRODUCTS } from "./ActionsType"

const AddToCartAction = (payload) => {
    return {
        type: ADD_TO_CART, payload: payload
    }
}

const GetCartItems = (payload) => {
    return {
        type: GET_CART_PRODUCTS, payload: payload
    }
}


export { AddToCartAction, GetCartItems }

