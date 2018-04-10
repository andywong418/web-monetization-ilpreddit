import axios from 'axios';
import { history } from '../store/configureStore';
// export
export const onPost = (title, content, imageUrl) => async (dispatch) =>{
  axios.post('/api/post/new', {title, content, imageUrl, subredditId: 1}).then(resp => {
    dispatch({type: 'NEW_POST', payload: resp.data});
    history.push('/');
  });
}
