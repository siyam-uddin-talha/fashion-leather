import { SET_TOTAL } from "./ActionsType"

const SetTotalCartAmount = (payload) => {
    return {
        type: SET_TOTAL, payload: payload
    }
}

export default SetTotalCartAmount