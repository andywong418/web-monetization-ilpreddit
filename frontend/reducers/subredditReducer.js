const defaultState ={
  subreddits: [],
  currentSubreddit: '',
};

const copyState = (state) => {
  return Object.assign({}, state)
}

export default function(state = defaultState, action) {
  let newState = copyState(state);
  switch (action.type) {
    case 'NEW_SUBREDDIT':
      const newSubreddits = newState.subreddits.slice();
      newSubreddits.push(action.payload);
      newState.subreddits = newSubreddits;
      return newState;
    case 'FETCH_SUBREDDITS':
      newState.subreddits = action.payload;
      return newState;
    default:
      return state;
  }
}
