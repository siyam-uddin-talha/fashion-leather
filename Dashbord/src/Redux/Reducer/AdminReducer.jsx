const initaialState = {
    admin: false,
    loading: true
}

const AdminReducer = (state = initaialState, { type, payload }) => {
    if (type === 'ADMIN_LOGIN_FAIL') {
        return {
            admin: false,
            loading: false
        }
    }
    if (type === 'ADMIN_LOGIN_SUCCESS') {
        return {
            admin: true,
            loading: false
        }
    }
    return state
}

export default AdminReducer