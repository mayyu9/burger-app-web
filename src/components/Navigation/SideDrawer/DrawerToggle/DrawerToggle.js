import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = (props) => (
    <div onClick={props.menuHandler}>MENU</div>
);

export default DrawerToggle;