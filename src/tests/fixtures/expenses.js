import moment from 'moment';

export default [
    {
        id:'1',
        description: 'orange',
        note:'',
        amount: 999,
        createdAt:0
    },
    {
        id:'2',
        description: 'banana',
        note:'',
        amount: 555,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id:'3',
        description: 'banana',
        note:'',
        amount: 1111,
        createdAt: moment(0).add(4, 'days').valueOf()
    }
];
