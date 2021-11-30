/*
author:'Arnob Islam'
created date:'16-10-21'
description:''
*/

const mongoose = require('mongoose');


const product = new mongoose.Schema({
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
        default: 0
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
    catagory: {
        type: String,
        required: [true, 'Must provided the product catagory']
    },
    keywords: [{
        type: String,
        required: [true, 'Must provided the product keywords']
    }],
    description: [{
        type: String,
        required: [true, 'Must provided the product description']
    }],
    images: [
        {
            type: String,
            required: [true, 'Must provided the product images'],
            minlength: 2
        }],

    ratingScore: {
        type: Number,
        default: 0
    },
    totalReviewCount: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            reviewerName: {
                type: String,
                required: [true, 'Must provided the reviewrs name']
            },
            reviewId: {
                type: String,
                required: [true, 'Must provided the reviewrs id']
            },
            reviewerphotoUrl: {
                type: String,

            },
            reviewRating: {
                type: Number,
                required: [true, 'Must provided the reviewrs rating']
            },

            reviewContent: {
                type: String,
            },

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    timeStamp: {
        type: Number,
    },

})




const Product = mongoose.model('products', product)

module.exports = Product

