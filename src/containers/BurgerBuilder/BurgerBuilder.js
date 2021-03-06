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
import {addIngredients, removeIngredients, initIngredients} from '../../actions/BurgerBuilderActions';
import {purchaseInit} from '../../actions/OrderAction';
import {setAuthRedirect} from '../../actions/AuthAction';

//adding export here will help us in testing, because it will export the class component as named export
// it will detach it from the redux environment for testing purpose.
export class BurgerBuilder extends React.Component{
    state = {
        //purchasable: false,
        showModal:false,
        // loading: false,
        // error: false,
     }

    componentDidMount(){
        this.props.fetchIngredients();
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
        if(this.props.isAuth){
            this.setState({showModal:true});
        }else{
            //executing the setAuthRedirectpath action with checkout as paramter.
            //so that we set the path to /checkout in auth reducer.
            //hence when we authenticate after building the burger, we will be directed to checkout page.
            //there we are getting ingredients data via redux.
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
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

        this.props.onInitPurchase(); // redirect to home page after the purchase is successful. this action allows us to fetch data required for redirecting
        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo = {...this.props.ings};

        for(let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error?<p style={{textAlign:"center"}}>Ingredients can't be loaded</p> :<Spinner />;

        if(this.props.ings){
            burger =(<Aux>
                <Burger ingredients= {this.props.ings} />
                <BuildControls 
                    ingredientAdd={this.props.onIngredientAdded}
                    ingredientSub= {this.props.onRemovedIngredient}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    handler={this.orderHandler}
                    isAuth={this.props.isAuth}
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
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }
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
        ings: state.bugerBuilder.ingredients,
        totalPrice: state.bugerBuilder.totalPrice,
        error: state.bugerBuilder.error,
        isAuth: state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredients(ingName)),
        onRemovedIngredient: (ingName) => dispatch(removeIngredients(ingName)),
        fetchIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirect(path)),
    }
}
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(withErrorHandler(BurgerBuilder, axios));