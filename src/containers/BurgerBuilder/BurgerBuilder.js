import React from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends React.Component{
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        }
     }
    render(){
        return(
            <Aux>
                <Burger ingredients= {this.state.ingredients} />
                <div>Burger controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;