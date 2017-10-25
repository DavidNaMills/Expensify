import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({description, amount, createdAt, id, dispatch})=>(
    <div>
        <Link to={`/edit/${id}`} ><h4>{description}</h4></Link>
        <p>
            {numeral(amount/100).format('$0,0.00')}
            -
            {moment(createdAt).format('MMMM Do, YYYY')}
        </p>
    </div>
);

//const mapStoreToProps = (state)=>{};



export default ExpenseListItem;