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
    
    const transformedIngredients = Object.keys(props.ingredients)
    .map( (igKey,i) => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return  <BurgerIngredient key={igKey+i} type={igKey} />
        }); 
    });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" /> 
        </div>
    )
};

export default Burger;