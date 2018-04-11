import axios from 'axios';
import {history} from '../store/configureStore';

export const onNewSubreddit = (title, description) => async(dispatch) => {
  axios.post('/api/subreddit/new', {title, description}).then(resp => {
    dispatch({type: 'NEW_SUBREDDIT', payload: resp.data});
    history.push('/');
  })
}
