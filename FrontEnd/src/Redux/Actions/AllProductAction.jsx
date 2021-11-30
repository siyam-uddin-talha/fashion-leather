import { DISPLAY_ALL_PRODUCT_SUCCESS, DISPLAY_ALL_PRODUCT_FAIL } from "./ActionsType"

const AllProductSuccess = (payload) => {
    return {
        type: DISPLAY_ALL_PRODUCT_SUCCESS, payload: payload
    }
}

const AllProductFail = () => {
    return {
        type: DISPLAY_ALL_PRODUCT_FAIL
    }
}

export { AllProductSuccess, AllProductFail }