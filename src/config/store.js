import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import spylogReducer from '../reducers/spylogReducer';
import foldersReducer from '../reducers/foldersReducer';
import systemReducer from '../reducers/systemReducer';

const rootReducer = combineReducers({
    spylogReducer,
    foldersReducer,
    systemReducer
});

const store = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : null
    )
)

export default store;