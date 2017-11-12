import axios from 'axios';
import { history } from '../store/configureStore';
// export
export const onPost = (title, content, imageUrl) => {
  axios.post('/api/post/new', {title, content, imageUrl, subredditId: 1}).then(resp => {
    history.push('/');
  });
}
