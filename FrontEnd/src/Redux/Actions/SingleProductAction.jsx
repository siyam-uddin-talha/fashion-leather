import { SINGLE_PRODCUT_FAIL, SINGLE_PRODUCT_SUCCESS } from "./ActionsType"

const SingleProductSuccess = (payload) => {
    return {
        type: SINGLE_PRODUCT_SUCCESS, payload: payload
    }
}

const SingleProductFail = () => {
    return {
        type: SINGLE_PRODCUT_FAIL
    }
}

export { SingleProductSuccess, SingleProductFail }