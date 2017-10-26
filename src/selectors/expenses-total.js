
export default (expensesTotal)=>{
    
    if(expensesTotal.length===0){
        return 0;
    } else {
        const newArray = expensesTotal.map((x)=>{return x.amount});
        return newArray.reduce((acc, x)=> acc+x, 0);
    }
};
