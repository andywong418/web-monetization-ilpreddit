import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            DevTools.instrument()
        ),
    );
}
