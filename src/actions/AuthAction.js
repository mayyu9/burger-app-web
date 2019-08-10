import axios from 'axios';
import * as actionTypes from '../constants/constants';

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_START_SUCCESS,
        idToken: token,
        userId: userId,
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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {setTimeout( () => {
            dispatch(logout());
    },expirationTime * 1000)
    }
}

export const authInit = (email, pwd, isSignup) => {
    return dispatch => {
        const authData = {
            email:email,
            password:pwd,
            returnSecureToken:true
        };
        dispatch(authStart());
        //url for signup
        //let url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=api_key';
        let url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA9lNRGYqSAvgulZll-i44OKZSh-8rKzhk';

        if(!isSignup){
            url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA9lNRGYqSAvgulZll-i44OKZSh-8rKzhk';
            //url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=api_key';
        }

        //api_key= AIzaSyA9lNRGYqSAvgulZll-i44OKZSh-8rKzhk
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.token, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirect = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')); //wrap with date coz it convert string to date object
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/ 1000 ) );  //divide by 1000 to convert time into seconds          
            }
        }
    }
}