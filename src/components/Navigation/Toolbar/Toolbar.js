import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo' 
import NavigationItems from '../NavigaionItems/NavigationItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>
            Menubar
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
    
);

export default Toolbar;