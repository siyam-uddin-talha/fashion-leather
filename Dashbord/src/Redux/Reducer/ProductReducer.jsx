const initaialState = {
    products: [],
    loading: true,
    orders: []
}

const ProductReducer = (state = initaialState, { type, payload }) => {
    if (type === 'PRODUCT_SUCCESS') {
        return {
            ...state,
            products: payload,
            loading: false
        }
    }
    if (type === 'LOGIN_SUCCESS_AND_ORDERS') {
        return {
            ...state,
            orders: payload,
            loading: false
        }
    }
    if (type === 'FAIL') {
        return {
            ...state,
            loading: false
        }
    }
    return state
}

export default ProductReducer