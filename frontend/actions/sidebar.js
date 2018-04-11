import axios from 'axios';
import { push } from 'react-router-redux';
export const onRegister = (username, password, paymentPointer) => async(dispatch) => {
    const urlString = '/api/user/register';
    axios.post(urlString, { username, password, paymentPointer }).then(resp => {
        dispatch({type: 'REGISTER', payload: resp.data.user});
    })
    .catch(err => {
      console.log("ERR", err);
    })
};

export const onLogin = (username, password) => async(dispatch) => {
    const urlString = '/api/user/login';
    axios.post(urlString, {username, password}).then(resp => {
        dispatch({type: 'LOGIN', payload: resp.data.user});
    });
};

export const onLogOut = (user) => async(dispatch) => {
    const urlString = '/api/user/logout';
    axios.post(urlString, {id: user.id}).then(resp => {
        dispatch({type: 'LOGOUT', payload: {}});
    });
};

export const subscribeSubreddit = (subredditId) => async(dispatch) => {
  axios.post('/api/subreddit/subscribe', { subredditId }).then(resp => {
    dispatch({type: 'NEW_SUBSCRIPTION', payload: resp.data});
  })
}

export const fetchUser = () => async (dispatch) =>{
  console.log("getting in action")
  axios.get('/api/user/').then(resp => {
    dispatch({type: 'FETCH_USER', payload: resp.data})
  })
}
export const onNavigateTo = (store, dest) => async(dispatch) => {
  dispatch(push(dest));
}
