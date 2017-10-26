import React from 'react';
import {connect} from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import numeral from 'numeral';


export const ExpenseSummary =({expenseCount, expenseTotal})=>{
    return (
            <div>
                <p>viewing {expenseCount}</p>
                <p>grand total is: {numeral(expenseTotal/100).format('$0,0.00')}</p>
            </div>
    );
};


const mapStateToProps =(state)=>{
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return {
        expenseCount:visibleExpenses.length,
        expenseTotal: expensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);