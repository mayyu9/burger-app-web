import * as actionTypes from '../constants/constants';

const initialState = {
    orders:[],
    loading: false,
    purchased: false,
}

const OrderReducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.PURCHASE_BRUGER_INIT: {
            return{
                ...state,
                purchased: false
            }
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS_FAILED: {
            return{
                ...state,
                loading: false
            }
        }
        case actionTypes.PURCHASE_BURGER_START:{
            return {
                ...state,
                loading: true
            }
        }
        default:
        return state;
    }
}

export default OrderReducer;