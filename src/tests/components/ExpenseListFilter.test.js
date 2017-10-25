import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilter} from '../../components/ExpenseListFilter';
import {filters, altFilters} from '../fixtures/filters';

let wrapper, setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount;

beforeEach(()=>{
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setStartDate=jest.fn();
    setEndDate=jest.fn();
    setTextFilter= jest.fn();
    wrapper = shallow(<ExpenseListFilter 
        filters={filters}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        setTextFilter={setTextFilter}
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
    />);
});


test('should render ExpenseListFilter correctly', ()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilter with altDate correctly', ()=>{
    wrapper.setProps({
        filters:altFilters
    });

    expect(wrapper).toMatchSnapshot();
});


test('should handle text change', ()=>{
    const temp='This is a controlled test';
    wrapper.find('input').simulate('change', {target:{value:temp}});
    expect(setTextFilter).toHaveBeenLastCalledWith(temp);
});

test('should sort by date', ()=>{
    wrapper.setProps({
        filters:altFilters
    });

    const value = 'date';
    wrapper.find('select').simulate('change',{
        target:{value}
    })
    expect(sortByDate).toHaveBeenCalled();
});


test('should sort by amount', ()=>{
    const value="amount";
    wrapper.find('select').simulate('change', {target:{value}});
    expect(sortByAmount).toHaveBeenCalled();
});


test('should handle date change', ()=>{
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


test('should handle date focus change startDate', ()=>{
    const calendarFocused = 'startDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

test('should handle date focus change endDate', ()=>{
    const calendarFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});



// should handle date focus changes