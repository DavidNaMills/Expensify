const promise = new Promise((resolve, reject)=>{
setTimeout(()=>{
    resolve();
}, 2000);
});

promise.then((data)=>{
    console.log('resolved');
});