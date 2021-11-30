import { DISPLAY_ALL_PRODUCT_FAIL, DISPLAY_ALL_PRODUCT_SUCCESS } from "../Actions/ActionsType"

const InitialState = {
    products: [],
}

const ProductReducer = (state = InitialState, { type, payload }) => {
    if (type === DISPLAY_ALL_PRODUCT_SUCCESS) {
        const _product = payload.map(item => {
            const { title, totalReviewCount, images, price, ratingScore, _id, createdAt, discountPrice, stock, stockCount } = item
            const thumb = images[0]
            return {
                title, totalReviewCount, thumb, price, ratingScore, _id, createdAt, discountPrice, stock, qty: 1, stockCount
            }
        })
        return {
            ...state,
            products: _product
        }
    }
    if (type === DISPLAY_ALL_PRODUCT_FAIL) {
        return {
            ...state,
            products: []
        }
    }
    return state

}

export default ProductReducer