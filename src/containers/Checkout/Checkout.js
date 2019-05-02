import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends React.Component{
    // state={
    //     ingredients:null,
    //     totalPrice:0,
    // }

    // componentWillMount() {
    //     const queryData = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price =0;
    //     //we have to use for of loop to fetch query params data
    //     for(let params of queryData.entries()){
    //         //['salad' , '1']
    //         if(params[0] === 'price'){
    //             price = params[1];
    //         }
    //         else{
    //             ingredients[params[0]] = +params[1];
    //         }
    //     }

    //     this.setState({ingredients:ingredients, totalPrice:price});
    // }
    onCancelled = () => {
        this.props.history.goBack(); //navigates back to previous screen in the stack.
    }

    onContinued = () => {
        this.props.history.replace('/checkout/contact-data'); //this replaces the current screen in stack with new screen in stack
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.onCancelled}
                    checkoutContinued={this.onContinued} />
                {/* this checkout code is one way to pass data to a component where you don't have access to router object
                    but that component need those props. */}
                {/* <Route 
                    path={ this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...props} />)}
                /> */}

                <Route 
                    path={ this.props.match.path + '/contact-data'}
                    component ={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);