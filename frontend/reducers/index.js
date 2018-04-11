import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sidebarReducer from './sidebarReducer';
import fetchPostsReducer from './postsReducer';
import postPageReducer from './postPageReducer';
import subredditReducer from './subredditReducer';
import subscriptionReducer from './subscriptionReducer';
function rootReducer(state = { name: 'Horizons' }, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  routing: routerReducer,
  rootReducer,
  sidebarReducer,
  fetchPostsReducer,
  postPageReducer,
  subredditReducer,
  subscriptionReducer,
});

export default mainReducer;
