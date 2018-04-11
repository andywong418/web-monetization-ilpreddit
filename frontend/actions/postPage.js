import axios from 'axios';

export const fetchViewPost = (id) => async(dispatch) => {
  axios.get(`/api/view/post/${id}`).then(resp => {
    dispatch({type: 'FETCH_VIEW_POST', payload: resp.data});
  })
};

export const fetchComments = (id) => async(dispatch) => {
  axios.get(`/api/view/post/${id}/comments`).then(resp => {
    dispatch({type: 'FETCH_COMMENTS', payload: resp.data});
  })
}

export const postComments = (comment, postId) => async(dispatch) => {
  axios.post('/api/comment/new', {comment, postId}).then(resp => {
    dispatch({type: 'POST_COMMENT', payload: resp.data});
  })
}

export const replyComment = (comment, commentId, postId) => async(dispatch) => {
  axios.post(`/api/comment/reply`, {comment, parentId: commentId, postId}).then(resp => {
    dispatch({type: 'REPLY_COMMENT', payload: resp.data});
  })
}

export const voteComment = (vote, commentId, postId) => async(dispatch) => {
  axios.post(`/api/comment/vote`, {vote, commentId, postId}).then(resp => {
    dispatch({type: 'VOTE_COMMENT', payload: resp.data});
  });
};

export const unvoteComment = (commentId, postId) => async(dispatch) => {
  axios.post(`/api/comment/unvote`, {commentId, postId}).then(resp => {
    dispatch({type: 'UNVOTE_COMMENT', payload: resp.data});
  });
};

export const giveGold = (paymentPointer, commentId, postId) => async(dispatch) => {
  axios.post('/api/comment/giveGold', { paymentPointer, commentId, postId }).then(resp => {
    dispatch({type: 'GIVE_GOLD', payload: resp.data});
  })
}
