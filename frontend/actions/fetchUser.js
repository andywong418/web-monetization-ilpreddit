import axios from 'axios';

export const fetchSubreddits = () => async (dispatch) =>{
  axios.get('/api/fetchUser').then(resp => {
    dispatch({type: 'FETCH_USER', payload: resp.data})
  })
}
