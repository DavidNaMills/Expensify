import {connect} from 'react-redux';
import React from 'react';

import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

export const ExpenseList = (props)=>(
    <div>
        {
            props.expenses.length === 0? (
                <h1>No Items</h1>
            ):(
               props.expenses.map((item)=>{
                    return <ExpenseListItem key={item.id}{...item} />
            }))
        }
    </div>
);

const mapStateToProps =(state)=>{
    return {
        expenses:getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);