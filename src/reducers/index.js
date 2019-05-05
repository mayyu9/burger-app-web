import {combineReducers} from 'redux';

import BurgerBuilderReducer from './BurgerBuilderReducer';
import OrderReducer from './OrderReducer';


const rootReducer = combineReducers({
    bugerBuilder: BurgerBuilderReducer,
    order: OrderReducer
});

export default rootReducer;