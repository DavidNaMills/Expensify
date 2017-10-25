import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('shold setup default values', ()=>{
    const state =filtersReducer(undefined, {type:'@@INIT'});
    expect(state).toEqual({
        text:'',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })  ;
});


test('should set sortBy to amount', ()=>{
    const state = filtersReducer(undefined, {type:'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});


test('should set sortBy to date', ()=>{
    const currentState = {
        text:'',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined      
    };
    const action = {type:'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set the text filter', ()=>{
    const text = 'Ronnie James Dio';
    const action = {
        text,
        type:'SET_TEXT_FILTER'
    };
    const state = filtersReducer(undefined, action);
    
    expect(state.text).toBe(text);
});


test('should set startDate', ()=>{
    const mom = moment(1234567890);
    const action = {
        startDate: mom,
        type:'SET_BY_START_DATE'
    };
    const state = filtersReducer(undefined, action);
    
    expect(state.startDate).toBe(mom);
});


test('shoud set endDate', ()=>{
    const mom = moment(1234567890);
    const action = {
        endDate: mom,
        type:'SET_BY_END_DATE'
    };
    const state = filtersReducer(undefined, action);
    
    expect(state.endDate).toBe(mom);
});


//should set text filter
//shoudl set startdate
//shoudl set enddate
