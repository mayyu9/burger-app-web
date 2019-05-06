import React from 'react';
import {connect} from 'react-redux';
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {fetchOrderInit} from '../../actions/OrderAction';

/* this component is for showing the orders from the firebase database */
class Orders extends React.Component{
    componentDidMount(){
        this.props.onInitOrder();
    }
    render(){
        let order = <Spinner />;
        if(!this.props.loading){
            order = this.props.myOrders.map(order =>
                <Order 
                    key={order.id}
                    ingredients = {order.ingredients}
                    price= {order.price} 
                />
                )
        }
        return(
            <div> 
                {order}
                {/* {this.state.myOrders.map(order =>
                    <Order 
                        key={order.id}
                        ingredients = {order.ingredients}
                        price= {order.price} 
                    />
                    )} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.order.loading,
        myOrders: state.order.orders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrder: () => dispatch(fetchOrderInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 