import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
//import {startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

let wrapper, editExpense, startRemoveExpense, startEditExpense, history;

beforeEach(()=>{
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {push:jest.fn()};

    wrapper = shallow(<EditExpensePage 
        startEditExpense={startEditExpense}
        startRemoveExpense={startRemoveExpense}
        history={history}
        expense={expenses[1]} 
    />);
});


test('should render the EditExpensePage', ()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', ()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle startRemoveExpense', ()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({
        id:expenses[1].id
    });
    
});