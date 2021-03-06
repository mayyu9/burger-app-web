import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter});

describe('Navigation Items', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two navigation items when not authenticated', () =>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three navigation items if authenticated', () =>{
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    //contains method allows us to check if a particular element got rendered or not 
    it('should contain logout link if authenticated', () =>{
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
})