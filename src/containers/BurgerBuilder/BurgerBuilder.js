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

     removeIngredientsHandler = (type) => {
        const prevCount = this.state.ingredients[type];
         //create a copy of state object and then update the count.
         const updateIngredients = {...this.state.ingredients};
         let updateCount;
            if(prevCount > 0) { 
                updateCount =  prevCount - 1;
                updateIngredients[type] = updateCount;
            }
            else
                return;
         

         //calculate the price:
         const oldPrice = this.state.totalPrice;
         const priceDeduction = INGREDIENTS_PRICE[type];
         const newPrice = oldPrice - priceDeduction;
         this.setState({ingredients:updateIngredients, totalPrice:newPrice});
     }
    render(){
        const disableInfo = {...this.state.ingredients};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0
        }

        return(
            <Aux>
                <Burger ingredients= {this.state.ingredients} />
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler}
                    ingredientSub= {this.removeIngredientsHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;