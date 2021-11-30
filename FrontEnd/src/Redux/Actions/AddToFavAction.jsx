import { ADD_TO_FAVORITE, GET_FAVORITE_PRODUCTS } from "./ActionsType"


const AddToFavAction = (payload) => {
    return {
        type: ADD_TO_FAVORITE, payload: payload
    }
}

const GetFavoriteItemAction = (payload) => {
    return {
        type: GET_FAVORITE_PRODUCTS, payload: payload
    }
}


export { AddToFavAction, GetFavoriteItemAction }

