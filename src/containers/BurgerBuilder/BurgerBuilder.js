import React from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends React.Component{
    state = {
        ingredients: {
            cheese: 1,
            meat: 2,
            salad: 2,
            bacon: 1
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