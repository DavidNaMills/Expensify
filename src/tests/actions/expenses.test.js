import {addExpense, editExpense, removeExpense} from '../..//actions/expenses';

const id = '123456abc';

test('should setup remove expense action object', ()=>{
    const action = removeExpense({id});

    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id
    });
});


test('should setup a remove expense action', ()=>{
    const action = editExpense(id, {description:'testing'});

    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id,
        updates:{description:'testing'}
    })
});

test('should setup addExpense action object with provided values', ()=>{
    const expenseData={
        description:"testing",
        amount:999999,
        createdAt:1000000,
        notes:'this is a testing note'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id: expect.any(String)
        },
    })
});

test('should setup addExpense action object with default values', ()=>{
    const action = addExpense();
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            description:'',
            amount:0,
            createdAt:0,
            notes:'',        
            id: expect.any(String)
        },
    })
});