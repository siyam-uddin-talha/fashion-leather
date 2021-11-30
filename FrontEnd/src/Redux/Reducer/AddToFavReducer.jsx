import { ADD_TO_FAVORITE, GET_BUSKET_PRODUCT_FAIL, GET_FAVORITE_PRODUCTS, } from "../Actions/ActionsType"

const InitialState = {
    favorite: [],
    login: false
}

const AddToFavoriteReducer = (state = InitialState, { type, payload }) => {


    if (type === GET_FAVORITE_PRODUCTS) {
        return {
            ...state,
            favorite: payload,
            login: true
        }
    }

    if (type === ADD_TO_FAVORITE) {
        return {
            ...state,
            favorite: payload,
            login: true
        }
    }
    if (type === GET_BUSKET_PRODUCT_FAIL) {
        return {
            ...state,
            login: false
        }
    }

    return state

}

export default AddToFavoriteReducer