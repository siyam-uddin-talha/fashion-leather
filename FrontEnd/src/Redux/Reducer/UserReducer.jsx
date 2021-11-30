const InitialState = {
    user: {},
    login: false,
    loading: true,
}


const UserReducer = (state = InitialState, { type, payload }) => {
    if (type === `USER_SUCCESS`) {
        return { ...state, login: true, user: payload, loading: false }
    }

    if (type === `USER_FAIL`) {
        return { ...state, login: false, loading: false }
    }
    if (type === 'USER_UPDATE_SUCCESS') {
        console.log(payload)
        return {
            ...state, user: payload
        }
    }
    return state
}

export default UserReducer