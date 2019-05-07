import {combineReducers} from 'redux';

import BurgerBuilderReducer from './BurgerBuilderReducer';
import OrderReducer from './OrderReducer';
import AuthReducer from './AuthReducer';


const rootReducer = combineReducers({
    bugerBuilder: BurgerBuilderReducer,
    order: OrderReducer,
    auth:AuthReducer
});

export default rootReducer;