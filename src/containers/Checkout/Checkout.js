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