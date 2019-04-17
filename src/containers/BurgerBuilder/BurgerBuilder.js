import React from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENTS_PRICE = { 
    salad: 20,
    meat: 80,
    cheese: 30,
    bacon: 25,
};

class BurgerBuilder extends React.Component{
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 20,
     }

     addIngredientHandler = (type) => {
         console.log(type)
         const prevCount = this.state.ingredients[type];
         const updateCount =  prevCount + 1;
         //create a copy of state object and then update the count.
         const updateIngredients = {...this.state.ingredients};
         updateIngredients[type] = updateCount;

         //calculate the price:

         const oldPrice = this.state.totalPrice;
         const priceAddition = INGREDIENTS_PRICE[type];
         const newPrice = oldPrice + priceAddition;
         this.setState({ingredients:updateIngredients, totalPrice:newPrice});
     }
    render(){
        return(
            <Aux>
                <Burger ingredients= {this.state.ingredients} />
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;