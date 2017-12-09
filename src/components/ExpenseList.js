import {connect} from 'react-redux';
import React from 'react';

import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

export const ExpenseList = (props)=>(
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0? (
                    <div className="list-item list-item__message">
                        <span>No Items</span>
                    </div>
                ):(
                props.expenses.map((item)=>{
                        return <ExpenseListItem key={item.id}{...item} />
                }))
            }
        </div>
    </div>
);

const mapStateToProps =(state)=>{
    return {
        expenses:getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);