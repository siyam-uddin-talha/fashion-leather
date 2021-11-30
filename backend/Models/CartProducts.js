/*
author:'Arnob Islam'
created date:'28-10-21'
description:''
*/

const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        userId: {
            type: String,
            require: true,
        },
        userEmail: {
            type: String,
            require: true,
        }
    },
    cartItems: [
        {
            _id: {
                type: String,
                required: [true, 'Must provide the products id']
            },
            title: {
                type: String,
                required: [true, 'Must provide the products title']
            },
            price: {
                type: Number,
                required: [true, 'Must provide the products price']
            },
            discountPrice: {
                type: Number,
            },
            stock: {
                type: Boolean,
                required: [true, 'Must provide stock of the product'],
                default: true,
            },
            stockCount: {
                type: Number,
                required: [true, 'Must provide stock of the product count']
            },
            thumb:
            {
                type: String,
                required: [true, 'Must provided the product thumb'],
            },
            qty:
            {
                type: Number,
                required: [true, 'Must provided the product qty'],
            },
        }
    ]

})

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart