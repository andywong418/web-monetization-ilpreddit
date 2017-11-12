import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import sidebarReducer from './sidebarReducer';
import fetchPostsReducer from './postsReducer';
import postPageReducer from './postPageReducer';
function rootReducer(state = {name: 'Horizons'}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const mainReducer = combineReducers({routing: routerReducer, rootReducer, sidebarReducer, fetchPostsReducer, postPageReducer});
export default mainReducer;
