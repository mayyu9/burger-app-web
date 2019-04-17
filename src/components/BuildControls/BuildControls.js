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
            {controls.map(ing => {
                return <BuildControl key={ing.label} label={ing.label} />
            })}
        </div>
    )
};

export default BuildControls;