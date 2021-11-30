/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const admin = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})


admin.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 12)
    }
    next()
})


const ADMIN = mongoose.model('Admins', admin)

module.exports = ADMIN

