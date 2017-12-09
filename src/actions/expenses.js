import uuid from 'uuid';
import db from '../firebase/firebase';

export const addExpense=(expense)=>({
    type:'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {})=>{
    return (dispatch, getState)=>{
        const uid=getState().auth.uid;
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt=0
        } = expenseData;
        const expense = {description, note, amount, createdAt};
        return db.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
            dispatch(addExpense({
                id:ref.key,
                ...expense
            }));
        });
    };
};


export const editExpense=(id, updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense=(id, updates) =>{
    return(dispatch, getState)=>{  //return a function
        const uid= getState().auth.uid;
        return db.ref(`users/${uid}/expenses/${id}`).set(updates).then(()=>{
            dispatch(editExpense(id, updates));
        });
    } 
};

export const removeExpense=(({id})=>({
    type: 'REMOVE_EXPENSE',
    id
}));


export const startRemoveExpense=(({id}={})=>{
    return(dispatch, getState)=>{
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        });
    }
});


export const setExpenses = ((expenses)=>({       //to add to the state
        type:'SET_EXPENSES',
        expenses

}));

export const startSetExpenses = ()=>{
    return(dispatch, getState)=>{
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/expenses`).once('value').then((snapshot)=>{
            const expenses = [];
            snapshot.forEach((child)=>{
                expenses.push({
                    id:child.key,
                    ...child.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};