import axios from 'axios';
import { history } from '../store/configureStore';
// export
export const onPost = (title, content, imageUrl, subredditId) => async (dispatch) =>{
  axios.post('/api/post/new', {title, content, imageUrl, subredditId}).then(resp => {
    dispatch({type: 'NEW_POST', payload: resp.data});
    history.push('/');
  });
}
