import React from 'react';
import Aux from '../../hoc/Wrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout  extends React.Component {
    state= {
        showSideDrawer: true,
    }
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false});
    }
    render(){
        return(
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closeHandler={this.sideDrawerCloseHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;