/*this file is a wrapper arround the burger ingredients files */
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map( (igKey,i) => {
    //         console.log("igKey: "+igKey);
    //         return (
    //             <BurgerIngredient key={i+1} type={igKey} />
    //         )
    //     })
    /*this function converts an object to array and then loop on that array.
    again looping on the same object to get the quantity given by user for a particular ingredient type.
    Reduce- we are converting the complete single Array object, so that we can display user a message to add ingredients. */
    let transformedIngredients = Object.keys(props.ingredients)
    .map( (igKey,i) => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return  <BurgerIngredient key={igKey+i} type={igKey} />
        }); 
    }).reduce((arr, el) => {
            return arr.concat(el);
        },[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" /> 
        </div>
    )
};

export default Burger;