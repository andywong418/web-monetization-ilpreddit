import axios from 'axios';

export const fetchPosts = () => async (dispatch) =>{
  axios.get('/api/post/all').then(resp => {
    dispatch({type: 'FETCH_POSTS', payload: resp.data.posts})
  })
}
