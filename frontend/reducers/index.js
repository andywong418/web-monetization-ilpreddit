import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import sidebarReducer from './sidebarReducer';
function rootReducer(state = {name: 'Horizons'}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const mainReducer = combineReducers({routing: routerReducer, rootReducer, sidebarReducer});
export default mainReducer;
