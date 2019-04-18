import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls= [ 
    {label: 'Salad', type: "salad"},
    {label: 'Meat', type: "meat"},
    {label: 'Cheese', type: "cheese"},
    {label: 'Bacon', type: "bacon"},
];



const BuildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
             <p>Burger Price: <strong>{props.price.toFixed(2)} INR</strong></p>
            {controls.map(ing => {
                return <BuildControl 
                    key={ing.label} 
                    label={ing.label}
                    added={() => props.ingredientAdd(ing.type)}
                    sub = {() => props.ingredientSub(ing.type)}
                    disabled = {props.disabled[ing.type]}
                    />
            })}
            <button 
                className={classes.OrderButton}
                onClick={props.handler}
                disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    )
};

export default BuildControls;