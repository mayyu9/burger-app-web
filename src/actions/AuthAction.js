import axios from 'axios';
import * as actionTypes from '../constants/constants';

export const authSuccess = (data) => {
    return{
        type: actionTypes.AUTH_START_SUCCESS
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START_FAIL,
        error: error
    }
}

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authInit = (email, pwd) => {
    return dispatch => {
        const authData = {
            email:email,
            password:pwd,
            returnSecureToken:true
        };
        dispatch(authStart());

        //api_key= AIzaSyA9lNRGYqSAvgulZll-i44OKZSh-8rKzhk
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=API_KEY', authData)
            .then(res => {
                console.log('response: '+res);
                dispatch(authSuccess(res.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error))
            })
    }
}