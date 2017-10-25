import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';


const ExpenseListItem = ({description, amount, createdAt, id, dispatch})=>(
    <div>
        <Link to={`/edit/${id}`} ><h4>{description}</h4></Link>
        <p>Amount: {amount}</p>
        <p>Created at: {createdAt}</p>
    </div>
);

//const mapStoreToProps = (state)=>{};



export default ExpenseListItem;