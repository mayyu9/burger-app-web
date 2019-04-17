import React from 'react';
import Aux from '../../hoc/Wrapper';
import classes from './Layout.css';

const Layout = (props) => (
    <Aux>
        <div>Toolbar, sidebar, drawer</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;