import axios from 'axios';

export const fetchSubreddits = () => async (dispatch) =>{
  axios.get('/api/subreddit/all').then(resp => {
    dispatch({type: 'FETCH_SUBREDDITS', payload: resp.data.subreddits})
  })
}
