/*
author:'Arnob Islam'
created date:'19-10-21'
description:''
*/


const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    to: {
        id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    notifications: [
        {
            title: {
                type: String,
                required: true
            }
        }
    ]
})

const NOTIFICATION = mongoose.model('notification', NotificationSchema)

module.exports = NOTIFICATION