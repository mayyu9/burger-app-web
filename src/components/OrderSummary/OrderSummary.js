import React from 'react';
import Aux from '../../hoc/Wrapper';

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
           <p>Continue to Checkout ?</p>
       </Aux>
   )
};

export default OrderSummary;