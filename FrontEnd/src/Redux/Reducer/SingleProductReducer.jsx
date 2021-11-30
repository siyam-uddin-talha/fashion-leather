import { SINGLE_PRODCUT_FAIL, SINGLE_PRODUCT_SUCCESS } from "../Actions/ActionsType"

const initialState = {
    product: {},
    loading: true

}

const SingleProductDetailsReducer = (state = initialState, { type, payload }) => {

    if (type === SINGLE_PRODUCT_SUCCESS) {
        return {
            ...state,
            product: { ...payload, qty: 1 },
            loading: false
        }
    }

    if (type === SINGLE_PRODCUT_FAIL) {
        return {
            ...state,
            product: {},
            loading: false
        }
    }


    if (type === `INCREASE_THE_SINGLE_PRODUCT`) {

        const { qty, stockCount, ...others } = state.product


        if (qty < stockCount) {
            let newqty = qty + 1
            return {
                ...state,
                product: {
                    ...others,
                    qty: newqty,
                    stockCount
                }
            }
        }
    }
    if (type === `DECRASE_THE_SINGLE_PRODUCT`) {

        const { qty, stockCount, ...others } = state.product


        if (qty > 1) {
            let newqty = qty - 1
            return {
                ...state,
                product: {
                    ...others,
                    qty: newqty,
                    stockCount
                }
            }
        }
    }



    return state

}

export default SingleProductDetailsReducer