const fs= require('fs');

let filekaPromise=fs.promises.readFile("f1.txt");


filekaPromise.then(function(data){
 console.log(data+"");
 let filekaPromise2=fs.promises.readFile("f2.txt");
   return filekaPromise2;
}).then(function(data){
    console.log(data+"");
    let filekaPromise3=fs.promises.readFile("f3.txt");
    return filekaPromise3;
}).then(function (data){
    console.log(data+"");
    let filekaPromise4=fs.promises.readFile("f4.txt");
    return filekaPromise4;
}).then(function(data){
    console.log(data+"");
    let filekaPromise5=fs.promises.readFile("f5.txt");
    return filekaPromise5;
}).then(function(data){
    console.log(data+"");
})

//orderly followed by file