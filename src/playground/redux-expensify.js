import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


const expensesReducerDefaultState = [];

const addExpense=({description='', notes='', amount=0, createdAt=0}={})=>({
    type:'ADD_EXPENSE',
    expense:{
        id: uuid(),
        description,
        notes,
        amount,
        createdAt
    }
});


const editExpense=(id, updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
});


const removeExpense=(({id}={})=>({
    type: 'REMOVE_EXPENSE',
    id
}));


const expensesReducer=(state=expensesReducerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return state.concat(action.expense);
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>id !==action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    };
};


const setTextFilter = (text ='')=>({
    type:'SET_TEXT_FILTER',
    text
});

const sortByAmount = (amount=0)=>({
    type:'SORT_BY_AMOUNT',
    amount
});


const sortByDate=(date)=>({
    type:'SORT_BY_DATE',
    date
});

const setStartDate=(startDate)=>({
    type:'SORT_BY_START_DATE',
    startDate
});

const setEndDate=(endDate)=>({
    type:'SORT_BY_END_DATE',
    endDate
});

const filterDefaultState = {
    text:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};


const filtersReducer=(state=filterDefaultState, action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':  //grab 
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_START_DATE':
            return {
                ...state,
                startDate:action.startDate
            };
        case 'SORT_BY_END_DATE':
            return {
                ...state,
                endDate:action.endDate
            };
        default:
            return state;
    }
}


//timestamps

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) =>{

    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !=='number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !=='number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        console.log("the text is: "+textMatch);

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=>{
        if(sortBy ==='date'){
            return a.createdAt < b.createdAt ? 1: -1;
        } else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};


const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters:filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});



store.dispatch(addExpense({description: 'fish2',amount: 500000, createdAt:100}));
store.dispatch(addExpense({description: 'fish1',amount: 100, createdAt:100}));
store.dispatch(addExpense({description: 'fish tank 2',amount: 20000, createdAt:300}));

// store.dispatch(removeExpense({id:id.expense.id}));

// store.dispatch(editExpense(id.expense.id, {amount:500}));


// store.dispatch(setTextFilter('fish'));


store.dispatch(sortByAmount());     //ammount
// store.dispatch(sortByDate());       //date

// store.dispatch(setStartDate(1));       //start date
// store.dispatch(setEndDate());       //end date
// store.dispatch(setEndDate(500));       //end date
// store.dispatch(setEndDate());       //end date
