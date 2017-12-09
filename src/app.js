import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';

import {startSetExpenses} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import {login, logout} from './actions/auth';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
// import './playground/promises';



const createdAt = 1507780800000;

const store = configureStore();

const state = store.getState();
const filtered = getVisibleExpenses(state.expenses, state.filters);
let hasRendered = false;
const renderApp = ()=>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard');
            }
        });
    } else {
        renderApp();
        store.dispatch(logout());
        history.push('/');
    }
});