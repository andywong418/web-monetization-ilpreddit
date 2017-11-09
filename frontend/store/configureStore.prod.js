import { createStore } from 'redux';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState
    );
}
