import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY ,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

  firebase.initializeApp(config);
const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// expenses with 3 items
// description, not, amount, created at


const ex1 = {
    description: 'hgf',
    amount:345,
    notes:'',
    createdAt: 124233
};

const ex2 = {
    description: 'dsfa',
    amount:345,
    notes:'',
    createdAt: 12
};

const ex3 = {
    description: 'full on',
    amount:34325,
    notes:'',
    createdAt: 123
};


const ex4 = {
    description: 'pizza',
    amount:34325,
    notes:'',
    createdAt: 123
};


db.ref('notes').on('child_changed',(snapshot)=>{
    const expenses=[];

    snapshot.forEach((child)=>{
        expenses.push({
            id:child.key,
            ...child.val()
        });
    });
    console.log(expenses);
});


export {firebase, googleAuthProvider, db as default};


