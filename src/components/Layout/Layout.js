import React from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Wrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout  extends React.Component {
    state= {
        showSideDrawer: false,
    }
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    showSideDrawerHandler = () => {
        //this.setState({showSideDrawer: true});
        this.setState(prevState => {
            return{showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render(){
        return(
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    SideDrawerHandler={this.showSideDrawerHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closeHandler={this.sideDrawerCloseHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);