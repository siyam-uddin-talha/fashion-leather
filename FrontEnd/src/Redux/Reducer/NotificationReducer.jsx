const InitialState = {
    login: false,
    notify: []
}


const NotificationReducer = (state = InitialState, { type, payload }) => {
    if (type === `LOGIN_AND_NOTIFICATION_SUCCESS`) {
        return { login: true, notify: payload }
    }
    if (type === `LOGIN_REQIRED`) {
        return { ...state, login: false, }
    }
    return state
}

export default NotificationReducer