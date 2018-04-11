const defaultState ={
  subscriptions: []
};

const copyState = (state) => {
  return Object.assign({}, state)
}

export default function(state = defaultState, action) {
  let newState = copyState(state);
  switch (action.type) {
    case 'FETCH_SUBSCRIPTIONS':
      newState.subscriptions = action.payload;
      return newState;
    case 'NEW_SUBSCRIPTION':
      const newSubscriptions = newState.subscriptions.slice();
      newSubscriptions.push(action.payload);
      newState.subscriptions = newSubscriptions;
      return newState;
    default:
      return state;
  }
}
