

import React from 'react';
import ReactDOM from 'react-dom';


const Info=(props)=>(
    <div>
        <h1>info</h1>
        <p>lorem ipsum dolum</p>
        <p> the info is: {props.info}</p>
    </div>
);


//aim is to reuse code
//render hijacking
//prop manipulation
//abstract state

const withAdminWarning=(WrappedComponent)=>{
    return (props) =>(      //this is the HOC
        <div>
            {props.isAdmin && <p>THIS IS PRIVATE INFO. TOP SECRET</p>}
            <WrappedComponent {...props}/>
        </div>
    )     
};


const isAuthenticated=(WrappedComponent)=>{
    return (props)=>(
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} />
                : <p>YOU NEED TO LOGIN</p>}
        </div>
    );
};


const AdminInfo = withAdminWarning(Info);     //returns a 
const IsAuthenticated = isAuthenticated(Info);

ReactDOM.render(<IsAuthenticated isAuthenticated={false} info={"bollocks"} />, document.getElementById('app'));