import * as actionTypes from '../constants/constants';
import axios from '../axios-orders';

export const addIngredients = (ingName) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredients = (ingName) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsFailed = () => {
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://my-burger-app-83f21.firebaseio.com/ingredients.json')
        .then(res => dispatch(setIngredients(res.data)))
        .catch(error => dispatch(setIngredientsFailed()))
    }
}