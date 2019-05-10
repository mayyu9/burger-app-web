import React from 'react';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter});

describe('Burger builder', () => {
    let wrapper;

    beforeEach(() => {
        wrapper= shallow(<BurgerBuilder fetchIngredients={()=>{}} />)
    })
    it('should render build controls when receving ingredients',()=>{
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})