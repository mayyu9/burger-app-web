import * as actionTypes from '../constants/constants';
import axios from '../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (token,orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
            console.log('response ', response.data)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error))
        });

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_BRUGER_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderInit = (token, userId) =>{
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get('/orders.json'+queryParams)
            .then( res => {
                const fetchedOrder = [];
                for(let key in res.data){
                    fetchedOrder.push({
                        ...res.data[key],
                        id:key
                    });
                    dispatch(fetchOrderSuccess(fetchedOrder));
                //this.setState({loading:false, myOrders:fetchedOrder});
                }
            })
            .catch(err => dispatch(fetchOrderFail(err)))
    }
}