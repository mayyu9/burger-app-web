import React from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

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
        purchasable: false,
        showModal:false,
        loading: false,
     }

     updatePurchasable = (ingredients) => {
         const sum = Object.values(ingredients)
                .reduce((sum, element) => {
                    return sum + element;
                }, 0);
        this.setState({purchasable: sum > 0})
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
         this.updatePurchasable(updateIngredients);
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
         this.updatePurchasable(updateIngredients);
     }

    orderHandler = ()=>{
        this.setState({showModal:true});
    }

    backDropHandler = () => {
        this.setState({showModal:false});
    }

    continueHandler = () =>{
        //alert('you clicked continue');
        this.setState({loading: true});
        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name:'Mahendar Singh',
                address:{
                    door: 'h.no: 6-162',
                    street: '502319',
                    country: 'India',
                },
                email: 'test@gmail.com'
            },
            deliveryMethod:'fastest',
        };
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, showModal: false});
            console.log(JSON.stringify(response))
        })
        .catch(error => {
            this.setState({loading: false, showModal: false});
            console.log(JSON.stringify(error))
        });
    }
    render(){
        const disableInfo = {...this.state.ingredients};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0
        }

        let orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                cancelHandler={this.backDropHandler}
                continueHandler={this.continueHandler}
                price={this.state.totalPrice}
            />
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.showModal} backDrop={this.backDropHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients= {this.state.ingredients} />
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler}
                    ingredientSub= {this.removeIngredientsHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    handler={this.orderHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;