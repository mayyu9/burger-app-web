import axios from 'axios';
import * as actionTypes from '../constants/constants';

export const authSuccess = (data) => {
    return{
        type: actionTypes.AUTH_START_SUCCESS,
        idToken: data.idToken,
        userId: data.localId,
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
                dispatch(authSuccess(res.data));
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