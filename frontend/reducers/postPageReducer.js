const defaultState ={
  post: {},
  comments: [],
};

export default function(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_VIEW_POST':
      const newState = Object.assign({}, state);
      newState.post = action.payload;
      return newState;
    case 'FETCH_COMMENTS':
      const newCommentState = Object.assign({}, state);
      newCommentState.comments = action.payload;
      return newCommentState;
    case 'POST_COMMENT':
      const newCommentState2 = Object.assign({}, state);
      newCommentState2.comments = [action.payload, ...newCommentState2.comments];
      return newCommentState2;
    case 'REPLY_COMMENT':
      const newCommentState3 = Object.assign({}, state);
      newCommentState3.comments= [...newCommentState3.comments, action.payload];
      return newCommentState3;
    case 'VOTE_COMMENT':
      const newCommentState4 = Object.assign({}, state);
      newCommentState4.comments = newCommentState4.comments.slice();
      newCommentState4.comments.forEach((comment, index) => {
        if(comment.id === action.payload.id) {
          newCommentState4.comments[index].upvotes = action.payload.upvotes;
          newCommentState4.comments[index].downvotes = action.payload.downvotes;
          newCommentState4.comments[index].upvoted = action.payload.upvoted;
          newCommentState4.comments[index].downvoted = action.payload.downvoted;
        }
      });
      return newCommentState4;
    case 'UNVOTE_COMMENT':
    const newCommentState5 = Object.assign({}, state);
    newCommentState5.comments = newCommentState5.comments.slice();
    newCommentState5.comments.forEach((comment, index) => {
      if(comment.id === action.payload.id) {
        newCommentState5.comments[index].upvotes = action.payload.upvotes;
        newCommentState5.comments[index].downvotes = action.payload.downvotes;
        newCommentState5.comments[index].upvoted = action.payload.upvoted;
        newCommentState5.comments[index].downvoted = action.payload.downvoted;
      }
    });
    return newCommentState5;
    case 'GIVE_GOLD':
      const newCommentState6 = Object.assign({}, state);
      newCommentState6.comments = newCommentState6.comments.slice();
      newCommentState6.comments.forEach((comment, index) => {
        if(comment.id === action.payload.id) {
          newCommentState6.comments[index].gold = action.payload.gold;
        }
      })
      return newCommentState6
    default:
      return state;
  }
}
