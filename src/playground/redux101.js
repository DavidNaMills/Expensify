import {createStore} from 'redux';



const incrementCount=({by = 1})=>({
    type:'INCREMENT',
    by
});

const decrementCount=({by=1})=>({
    type:'DECREMENT',
    by
});


const setCount = ({by = 0})=>({
    type:'SET',
    by
});


const resetCount =()=>({
    type:'RESET'
});



const countReducer= (state={count:0}, action)=>{
    
    switch(action.type){
        case 'INCREMENT':   
            return {
                count: state.count+action.by
            };

        case 'DECREMENT':         
            return {
                count: state.count-action.by
            };
        case 'SET':
            return{
                count:action.by
            };
        case 'RESET':         
            return {
                count: 0
            };
        default:
            return state;
    }
};


const store = createStore(countReducer);



const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});



store.dispatch(incrementCount({by:5}));
store.dispatch(incrementCount({by:5}));
store.dispatch(decrementCount({by:3}));


store.dispatch(setCount({by:99}));
store.dispatch(resetCount());

// // unsubscribe();

// store.dispatch({type:'INCREMENT'});
// store.dispatch({type:'INCREMENT'});


