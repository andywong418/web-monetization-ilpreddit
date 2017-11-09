import { createStore, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            DevTools.instrument()
        )
    );
}
