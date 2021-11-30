/*
author:'Arnob Islam'
created date:'10-16-21'
description:''
*/

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DATABASE_URL).then(res => {
    console.log('connected successfully !!!');
}).catch(err => {
    console.log(err.message);
})