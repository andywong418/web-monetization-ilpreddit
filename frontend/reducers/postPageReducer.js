const defaultState ={
  post: {},
  comments: []
};

export default function(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_VIEW_POST':
      const newState = Object.assign({}, state);
      newState.post = action.payload;
      return newState;
    case 'FETCH_COMMENTS':
      const newCommentState = Object.assign({}, state);
      console.log("ACTION PAYLOAD", action.payload);
      newCommentState.comments = action.payload;
      return newCommentState;
    case 'POST_COMMENT':
      const newCommentState2 = Object.assign({}, state);
      console.log("action payload", action.payload);
      newCommentState2.comments = [action.payload, ...newCommentState2.comments];
      return newCommentState2;
    case 'REPLY_COMMENT':
      console.log("action", action.payload);
      const newCommentState3 = Object.assign({}, state);
      newCommentState3.comments= [...newCommentState3.comments, action.payload];
      return newCommentState3;
    default:
      return state;
  }
}
