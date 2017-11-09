import axios from 'axios';

export const onRegister = (username, password) => async(dispatch) => {
    console.log("GETTING IN?");
    const urlString = '/api/users/register';
    axios.post(urlString, {username, password}).then(resp => {
        dispatch({type: 'REGISTER', payload: resp.data.user});
    });
};

export const onLogin = (username, password) => async(dispatch) => {
    const urlString = '/api/users/login';
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
