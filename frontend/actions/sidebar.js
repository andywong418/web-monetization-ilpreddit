import axios from 'axios';

export const onRegister = (username, password) => async(dispatch) => {
    console.log("GETTING IN?");
    const urlString = '/register';
    axios.post(urlString, {username, password}).then(resp => {
        dispatch({type: 'REGISTER', payload: resp.data.user});
    });
};

export const onLogin = (username, password) => async(dispatch) => {
    const urlString = '/login';
    axios.post(urlString, {username, password}).then(resp => {
        dispatch({type: 'LOGIN', payload: resp.data.user});
    });
};
