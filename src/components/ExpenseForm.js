import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            errorMessage:''
        };
    }



    onDescriptionChange=(e)=>{
        const description = e.target.value;
        this.setState(()=>({description}));
    };
    
    
    onNoteChange=(e)=>{
        const note = e.target.value;
        this.setState(()=>({note}));
    };

    onAmountChange=(e)=>{
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        }
    };

    onDateChanged=(createdAt)=>{
        if(createdAt){
            
            this.setState(()=>({createdAt}));
        }
    };

    onFocusChange=({focused})=>{
        this.setState(()=>({calendarFocused:focused}));
    };


    onSubmit=(e)=>{
        e.preventDefault();

        if(!this.state.description || !this.state.amount){
            if(!this.state.description){
                this.setState(()=>({errorMessage:'Please enter a desription'}));
            }else if(!this.state.amount){
                this.setState(()=>({errorMessage:'Please enter an amount'}));
            }
        } else {
            this.setState(()=>({errorMessage:''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10)*100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }

    }


    render(){
        return (
            <form onSubmit={this.onSubmit} className="form">
                {!!this.state.errorMessage && <p className="form__error">{this.state.errorMessage}</p>}
                    <input type="text" placeholder="Description" className="text-input"
                    autoFocus value={this.state.description} onChange={this.onDescriptionChange}/>
                    <input type="number" className="text-input" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange}/>
                    <SingleDatePicker 
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChanged}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea className="text-area" placeholder="Brief note (Optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
                    <div>
                        <button className="button">{this.props.buttonTitle}</button>
                    </div>
            </form>
        )
    }

};