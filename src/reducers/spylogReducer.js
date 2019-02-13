import actionTypes from '../actions/actionTypes'; 

const initialState = {
    started: false,
    spyData: ""
};

const spylogReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.START_SPYLOG:
            return {
                ...state,
                started: true
            }
            case actionTypes.POPULIZE_SPYLOG:
            return {
                ...state,
                spyData: action.payload,
                started: true
            }
            case actionTypes.STOP_SPYLOG:
            return {
                ...state,
                spyData: "",
                started: false
            }
        default:    
            return state
    }
}

export default spylogReducer;