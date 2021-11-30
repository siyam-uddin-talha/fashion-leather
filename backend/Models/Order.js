/*
author:'Arnob Islam'
created date:'18-10-21'
description:'It is the schema of the order of the product'
*/

const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderItems: [
        {
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            discountPrice: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            thumb: {
                type: String,
                required: true
            },
            _id: {
                type: String,
                required: true
            },

        }
    ],
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,

        },
        lastName: {
            type: String,

        },
    },


    owner: {
        id: {
            type: String,
            required: true
        },
        ownerEmail: {
            type: String,
            required: true
        },
    },

    paymentInfo: {
        method: {
            type: String,
            required: true
        },
        brand: {
            type: String,
        },
        paidAt: {
            type: Date,
        },
        success: {
            type: Boolean,
            default: false,
        },
        // this two is for stripe pyment mathods
        client_secret: {
            type: String,
        },
        id: {
            type: String,
        },

    },

    shippingPrice: {
        type: Number,
        required: true,
    },


    totalPrice: {
        type: Number,
        required: true,
    },

    orderStatus: {
        type: String,
        default: "pending",
    },

    deliveredAt: Date,

    createdAt: {
        type: Date,
        default: new Date()
    },
    timeStamp: {
        type: Number,
    },
    success: {
        type: Boolean,
        default: true,
    },
    cancle: {
        type: Boolean,
        default: false,
    },
    purches: {
        type: Boolean,
        default: false,
    },

})

const ORDER = mongoose.model('orders', OrderSchema)

module.exports = ORDER