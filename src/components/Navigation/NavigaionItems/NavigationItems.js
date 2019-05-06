import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem 
            link='/' exact>
            Bruger Builder
        </NavigationItem>
        <NavigationItem link='/orders'>
            Orders
        </NavigationItem>
        <NavigationItem link='/auth'>
            Authenticate
        </NavigationItem>

    </ul>
);

export default NavigationItems;