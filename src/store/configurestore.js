import {createStore} from 'redux';
//import reducer from '../reducers/index';
import reducer from '../reducers/BurgerBuilderReducer';


const configStore = createStore(reducer);

export default configStore;