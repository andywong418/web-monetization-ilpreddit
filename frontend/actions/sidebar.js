import axios from 'axios';

export const onRegister = (username, password) => async(dispatch) => {
    console.log("GETTING IN?", username, password);
    const urlString = '/api/user/register';
    axios.post(urlString, {username, password}).then(resp => {
        console.log("resp", resp);
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

export const onLogOut = () => (user) => async(dispatch) => {
    const urlString = '/api/user/logout';
    axios.post(urlString, {id: user.id}).then(resp => {
        dispatch({type: 'LOGOUT', payload: {}});
    });
};
