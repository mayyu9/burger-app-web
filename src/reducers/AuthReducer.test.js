import reducer from './AuthReducer';
import * as actionTypes from '../constants/constants';

describe('test auth reducer', () =>{
    it('should return inital state when undefined action', () =>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })

    it('should store token upon succedful login', () =>{
        expect(reducer({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
            type:actionTypes.AUTH_START_SUCCESS,
            idToken: "some-token-value",
            userId: "some-id"
        })).toEqual({
            token: "some-token-value",
            userId: "some-id",
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })
})