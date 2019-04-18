import React from 'react';
import Aux from '../../hoc/Wrapper';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
                </li>
            );
        })
   return(
       <Aux>
           <h3>Your Order Summary</h3>
           <p>A delicious Burger with the following ingredients:</p>
           <ul>
                {ingredientsSummary}
           </ul>
           <p><strong>Total Price: {props.price.toFixed(2)} INR</strong></p>
           <p>Continue to Checkout ?</p>
           <Button btnType="Danger" clicked={props.cancelHandler}>CANCEL</Button>
           <Button btnType="Success" clicked={props.continueHandler}>CONTINUE</Button>
        </Aux>
   )
};

export default OrderSummary;