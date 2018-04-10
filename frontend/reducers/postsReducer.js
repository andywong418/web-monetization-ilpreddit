const defaultState ={
  posts: []
};


export default function(state = defaultState, action) {
  switch (action.type) {
    case 'NEW_POST':
      return state;
    case 'FETCH_POSTS':
      const newState = Object.assign({}, state);
      newState.posts = action.payload;
      return newState;
    default:
      return state;
  }
}
