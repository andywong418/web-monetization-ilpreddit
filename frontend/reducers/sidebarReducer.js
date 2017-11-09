

const defaultState = {
    description: '',
    user: false
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
        default:
            return state;
    }
}
