import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component{
    state={
        ingredients:{
            salad: 1,
            meat: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const queryData = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        //we have to use for of loop to fetch query params data
        for(let params of queryData.entries()){
            //['salad' , '1']
            ingredients[params[0]] = +params[1];
        }

        this.setState({ingredients:ingredients});
    }
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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.onCancelled}
                    checkoutContinued={this.onContinued} />
            </div>
        )
    }
}

export default Checkout;