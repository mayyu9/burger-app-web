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
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
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

export const fetchOrderInit = () =>{
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
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