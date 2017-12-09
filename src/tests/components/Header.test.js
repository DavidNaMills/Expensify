import React from 'react';
import { shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';

import {Header} from '../../components/Header';

test('should render header correctly', ()=>{
//     const renderer = new ReactShallowRenderer();
//     renderer.render(<Header />);
    
//    expect(renderer.getRenderOutput()) .toMatchSnapshot();

    const wrapper = shallow(<Header startLogout={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', ()=>{
    const startLogout = jest.fn();
    const result = shallow(<Header startLogout={startLogout}/>);
    result.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});