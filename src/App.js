import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {checkAuthState} from './actions/AuthAction';
import asyncComponent from './hoc/asyncComponents/asyncComponent';

//lazy loading the components.
const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  componentDidMount(){
    this.props.onAutoSignup();
  }
  render() {
    let route = (
      <Switch>
         <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" /> {/*this is just to redirect if any unknown path is given */}
      </Switch>
    );

    if(this.props.isAuthenticated){
      route = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" /> {/*this is just to redirect if any unknown path is given */}
          </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(checkAuthState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));
