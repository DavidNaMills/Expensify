import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';
const createdAt = 1507780800000;

const store = configureStore();

store.dispatch(addExpense({description:'gas bill', amount:500, createdAt}));
store.dispatch(addExpense({description:'water bill', amount:70, createdAt:1000}));
store.dispatch(addExpense({description:'water bill', amount:1000, createdAt}));
// store.dispatch(setTextFilter('water'));
const state = store.getState();
const filtered = getVisibleExpenses(state.expenses, state.filters);


// setTimeout(()=>{
//     store.dispatch(setTextFilter('gas'));
// }, 5000);

//console.log(filtered);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));