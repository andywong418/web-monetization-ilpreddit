import axios from 'axios';

export const fetchSubscriptions = () => async (dispatch) =>{
  axios.get('/api/subreddit/subscriptions').then(resp => {
    dispatch({type: 'FETCH_SUBSCRIPTIONS', payload: resp.data})
  })
}
