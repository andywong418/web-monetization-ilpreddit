const defaultState = {
    description: '',
    user: {}
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case 'REGISTER':
            // Return user
            const newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case 'LOGIN':
            const newLoginState = Object.assign({}, state);
            newLoginState.user = action.payload;
            return newLoginState;
        case 'FETCH_USER':
          const fetchUserState = Object.assign({}, state);
          fetchUserState.user = action.payload;
          return fetchUserState;
        default:
            return state;
    }
}
