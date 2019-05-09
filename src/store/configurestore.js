import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
//import BurgerBuilderReducer from '../reducers/BurgerBuilderReducer';


const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const configStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)) );

export default configStore;