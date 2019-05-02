import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Wrapper';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../constants/constants'

// const INGREDIENTS_PRICE = { 
//     salad: 20,
//     meat: 80,
//     cheese: 30,
//     bacon: 25,
// };

class BurgerBuilder extends React.Component{
    state = {
        //purchasable: false,
        showModal:false,
        loading: false,
        error: false,
     }

    componentDidMount(){
        // axios.get('https://my-burger-app-83f21.firebaseio.com/ingredients.json')
        // .then(res => this.setState({ingredients: res.data}))
        // .catch(error => this.setState({error: true}))
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        //this.setState({purchasable: sum > 0})
        return sum > 0;    
    }

    orderHandler = ()=>{
        this.setState({showModal:true});
    }

    backDropHandler = () => {
        this.setState({showModal:false});
    }

    continueHandler = () =>{
        //because of redux we can get the ingredients data from redux, no need to pass query params any more.

        // const queryParams =[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ "="+encodeURIComponent(this.state.ingredients[i]) );
        // }
        // queryParams.push('price='+ this.state.totalPrice);
        // const queryString = queryParams.join('&');

        //component which gets loaded from Route component, will get some props from the router object.
        //histroy is one such props. using the push method of history props, we can navigate to a particular route.

        //passing data to a route using the query params
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' +queryString
        // });

        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo = {...this.props.ings};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error?<p style={{textAlign:"center"}}>Ingredients can't be loaded</p> :<Spinner />;

        if(this.props.ings){
            burger =(<Aux>
                <Burger ingredients= {this.props.ings} />
                <BuildControls 
                    ingredientAdd={this.props.onIngredientAdded}
                    ingredientSub= {this.props.onRemovedIngredient}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    handler={this.orderHandler}
                    purchasable={this.updatePurchasable(this.props.ings)} />
            </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                cancelHandler={this.backDropHandler}
                continueHandler={this.continueHandler}
                price={this.props.totalPrice}
            />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.showModal} backDrop={this.backDropHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onRemovedIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(withErrorHandler(BurgerBuilder, axios));