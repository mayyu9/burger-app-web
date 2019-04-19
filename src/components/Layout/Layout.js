import React from 'react';
import Aux from '../../hoc/Wrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;