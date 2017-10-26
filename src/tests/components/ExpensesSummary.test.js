//basic snapshot test with snapshot

//test displaying correct amount
//test displaying correct number of expenses
import React from 'react';
import expenses from '../fixtures/expenses';
import {ExpenseSummary} from '../../components/ExpensesSummary';
import {shallow} from 'enzyme';

let wrapper;

test('should display component correctly', ()=>{
    wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={789}/>);
    expect(wrapper).toMatchSnapshot();
});


test('should display 0 amount', ()=>{
    wrapper = shallow(<ExpenseSummary expenseCount={432} expensesTotal={784239}/>);
    expect(wrapper).toMatchSnapshot();
});