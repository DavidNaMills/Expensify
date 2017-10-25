import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';



test('should set default state', ()=>{
    const state = expensesReducer(undefined, {type:'@@INIT'});
    expect(state).toEqual([]);
});



test('should remove expense by ID',()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});




test('should not remove if id not found',()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };
    
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});


test('should add expense',()=>{
    const temp={
        id: '99',
        description: 'fish',
        note:'10 of them',
        amount: 5255,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense:temp
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, temp]);
});



test('should edit expense',()=>{
    const description='this is a random test';

    const action = {
        type: 'EDIT_EXPENSE',
        id:expenses[1].id,
        updates:{
            description
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state[1].description).toEqual(description);
});


test('should not edit expense if id not found',()=>{
    const description='this is a random test';
    
        const action = {
            type: 'EDIT_EXPENSE',
            id:837634,
            updates:{
                description
            }
        };
    
        const state = expensesReducer(expenses, action);
        expect(state).toEqual(expenses);
});