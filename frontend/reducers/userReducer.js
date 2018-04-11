const defaultState = {
  user: null
};

const copyState = (state) => {
  return Object.assign({}, state)
}

export default function(state = defaultState, action) {
  let newState = copyState(state);
  switch (action.type) {
    case 'FETCH_USER':
      newState.user = action.payload;
      return newState;
    default:
      return state;
  }
}
