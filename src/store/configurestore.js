import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
//import BurgerBuilderReducer from '../reducers/BurgerBuilderReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)) );

export default configStore;