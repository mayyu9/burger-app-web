import * as actionTypes from '../constants/constants';

const initialState = {
    token: null,
    userId:null,
    error: null,
    loading: false,
}

const AuthReducer = (state= initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true,
                error:null,
            }
        case actionTypes.AUTH_START_SUCCESS: 
            return{
                ...state,
                loading: false,
                token: action.idToken,
                error:null,
                userId:action.userId
            }
        case actionTypes.AUTH_START_FAIL:
            return{
                ...state,
                loading: false,
                error:action.error
            }
        case actionTypes.LOGOUT: 
            return {
                ...state,
                token: null,
                userId:null
            }
        default:
            return state;
    }
}

export default AuthReducer;