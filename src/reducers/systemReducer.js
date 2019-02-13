import actionTypes from '../actions/actionTypes'; 

const initialState = {
    token: null,
    user: null,
    userError: null,
    error_messages: null,
    server_errors: null
};

const systemReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.payload
            }
        case actionTypes.USER:
            return {
                ...state,
                user: action.payload
            }
        case actionTypes.ERROR_MESSAGES:
            return {
                ...state,
                error_messages: action.payload
            }
        case actionTypes.SERVER_ERORRS:
            return {
                ...state,
                server_errors: action.payload
            }
        default:    
            return state
    }
}

export default systemReducer;