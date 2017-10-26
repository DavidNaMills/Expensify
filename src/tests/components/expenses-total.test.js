import expensesTotal from '../../selectors/expenses-total';

const testExpenses = [
    {
        id:1,
        description:'bowling',
        note:'',
        amount: 2000,
        createdAt:0
    }, 
    {
        id:2,
        description:'cola',
        note:'',
        amount: 100,
        createdAt:0
    }, 
    {
        id:3,
        description:'heating',
        note:'',
        amount: 3000,
        createdAt:0
    }];


test('should return 0 if not expenses', ()=>{
    const emptyTest = [];
    const result = expensesTotal(emptyTest);
    expect(result).toBe(0);
});


test('should correctly add up a single expense', ()=>{
    const result = parseFloat(expensesTotal([testExpenses[1]]));
    console.log();
    expect(result).toBe(testExpenses[1].amount);
});


test('should correctly add up multiple expenses', ()=>{
    const newArray = testExpenses.map((x)=>{return x.amount});
    const total = newArray.reduce((acc, x)=>{
            return acc+x;
    });

    const result = parseFloat(expensesTotal(testExpenses));
    expect(result).toBe(5100);
    expect(result).toBe(total);
});
