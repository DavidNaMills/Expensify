import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter=()=>(
    <Router history={history}>
            <Switch>
                <PrivateRoute path="/create" component={AddExpensePage}/>
                <PrivateRoute path="/help" component={HelpPage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <Route component={NotFoundPage} />
            </Switch>
    </Router>
);

export default AppRouter;