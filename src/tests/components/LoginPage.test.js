import React from 'react';

import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

test('Should render LoginPage corectly', ()=>{
    const wrapper = shallow(<LoginPage startLogin={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', ()=>{
    const startLogin = jest.fn();
    const result = shallow(<LoginPage startLogin={startLogin}/>);
    result.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});