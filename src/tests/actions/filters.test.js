import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters';
import moment from 'moment';



test('should generate set start date action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type:'SET_BY_START_DATE',
        startDate: moment(0)
    });
});


test('should generate set end date action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type:'SET_BY_END_DATE',
        endDate: moment(0)
    });
});


test('should generate sort by amount with provided amount', ()=>{
    const action=sortByAmount(999);
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        amount:999
    });
});

test('should generate sort by amount with default amount', ()=>{
    const action=sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        amount:0
    });
});


test('should generate sort by Date with provided value', ()=>{
    const action = sortByDate(moment(10000));
    expect(action).toEqual({
        type:'SORT_BY_DATE',
        date: moment(10000)
    });
});

test('should generate sort by Date with default value', ()=>{
    const action = sortByDate();
    expect(action).toEqual({
        type:'SORT_BY_DATE',
        date: undefined
    });
});

test('should generate set by text filter with provided values', ()=>{
    const action = setTextFilter('testingTesting123');
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'testingTesting123'
    });
});


test('should generate set by text filter with default values', ()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    });
});

