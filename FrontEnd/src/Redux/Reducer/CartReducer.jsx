import { ADD_TO_CART, GET_CART_PRODUCTS, GET_BUSKET_PRODUCT_FAIL } from "../Actions/ActionsType"

const InitialState = {
    cart: [],
    login: false,
    selectedProducts: [],
    userAddress: {},
    nextStep: false,
    shippingPrice: 200,
}


const AddToCartReducer = (state = InitialState, { type, payload }) => {

    if (type === GET_CART_PRODUCTS) {
        return {
            ...state,
            cart: payload,
            login: true
        }
    }

    if (type === ADD_TO_CART) {
        return {
            ...state,
            cart: payload,
            login: true

        }
    }

    if (type === GET_BUSKET_PRODUCT_FAIL) {
        return {
            ...state,
            login: false
        }
    }
    if (type === `INCREASE_SPACIFICF_PRODUCT_FROM_CART`) {
        const IncreasedCartItem = state.cart.map(e => {
            if (e._id === payload && e.qty < e.stockCount && e.stock === true) {

                let newQty = e.qty + 1
                return {
                    ...e,
                    qty: newQty
                }
            }
            return e
        })
        const SeclectedItem = state.selectedProducts.map(e => {
            if (e._id === payload && e.qty < e.stockCount && e.stock === true) {

                let newQty = e.qty + 1
                return {
                    ...e,
                    qty: newQty
                }
            }
            return e
        })
        return {
            ...state,
            cart: IncreasedCartItem,
            selectedProducts: SeclectedItem
        }

    }


    if (type === `DECRASE_SPACIFICF_PRODUCT_FROM_CART`) {

        const DecreaseCartItem = state.cart.map(e => {
            if (e._id === payload && e.qty > 1 && e.stock === true) {

                let newQty = e.qty - 1
                return {
                    ...e,
                    qty: newQty
                }
            }
            return e
        })
        const DecreaseSelectedItem = state.selectedProducts.map(e => {
            if (e._id === payload && e.qty > 1 && e.stock === true) {

                let newQty = e.qty - 1
                return {
                    ...e,
                    qty: newQty
                }
            }
            return e
        })

        return {
            ...state,
            cart: DecreaseCartItem,
            selectedProducts: DecreaseSelectedItem
        }

    }
    if (type === 'ADD_TO_THE_SELECTED_PRODUCT') {
        return {
            ...state,
            selectedProducts: [...state.selectedProducts, payload]
        }
    }

    if (type === 'REMOVE_TO_THE_SELECTED_PRODUCT') {
        const remainItem = state.selectedProducts.filter(e => e._id !== payload._id)
        return {
            ...state,
            selectedProducts: remainItem
        }
    }
    if (type === 'USER_FROM_DHAKA') {
        return {
            ...state,
            shippingPrice: 100
        }
    }
    if (type === 'USER_IS_NOT_FROM_DHAKA') {
        return {
            ...state,
            shippingPrice: 200
        }
    }




    return state

}

export default AddToCartReducer