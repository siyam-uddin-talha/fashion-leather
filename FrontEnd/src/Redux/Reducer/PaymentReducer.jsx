
const InitialState = {
    processing: false,
    payment: false,
    cod: false,//cash on delevary

}

const PaymentReducer = (state = InitialState, { type, payload }) => {


    if (type === 'CASH_ON_DELEVARY') {
        return {
            ...state,
            step2: true,
            cod: true
        }
    }

    if (type === 'PAYMENT_SUCCESS') {
        return {
            ...state,
            payment: true
        }
    }

    return state

}

export default PaymentReducer