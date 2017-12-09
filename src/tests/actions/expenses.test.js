import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from '../..//actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import db from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

const id = '123456abc';

beforeEach((done)=>{
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = {description, note, amount, createdAt};
    })
    db.ref('expenses').set(expensesData).then(()=>done());
});


test('should setup remove expense action object', ()=>{
    const action = removeExpense({id});

    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id
    });
}); 


// test('should setup a remove expense action', ()=>{
//     const action = startEditExpense(id, {description:'testing'});

//     expect(action).toEqual({
//         type:'EDIT_EXPENSE',
//         id,
//         updates:{description:'testing'}
//     })
// });

test('should update an expense in the database', (done)=>{
    const store = createMockStore({});
    const id = expenses[1].id;
    const test = {
        description:"15 beer bottles"
    };

    store.dispatch(startEditExpense(id, test)).then(()=>{
        return db.ref(`expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual({
            ...test
        });
        done();
    });


});

test('should setup addExpense action object with provided values', ()=>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:expenses[2]
    })
});


test('should add expense to DB and store', (done)=>{
    const store = createMockStore({});
    const {description, amount, note, createdAt} = expenses[1];
    const expenseData= {description, amount, note, createdAt};

    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to DB and store', (done)=>{
    const store = createMockStore({});
    const defaults = {
        description:'',
        note:'',
        amount:0,
        createdAt:0
    };

    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaults
            }
        });
        return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(defaults);
        done();
    });
});


test('should setup expense action object with data', ()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});


test('should fetch the expenses from firebase', (done)=>{
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        });
        done();
    });

});

test('should remove expense from database', (done)=>{
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id
        })
        return db.ref(`expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    });
    

});
