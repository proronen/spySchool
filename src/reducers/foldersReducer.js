import actionTypes from '../actions/actionTypes';

const initialState = {
    folders: "",
    selectedDirs: ""
}

const foldersReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_FOLDERS:
            return { 
                ...state,
                folders: action.payload
            }
        case actionTypes.SELECT_DIRS:
            return { 
                ...state,
                selectedDirs: action.payload
            }
        default: 
            return state 
    }
}

export default foldersReducer;