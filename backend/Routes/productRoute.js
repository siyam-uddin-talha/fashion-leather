/*
author:'Arnob Islam'
created date:'16-10-21'
description:''
*/

const express = require('express');
const router = express.Router() // requireing the Router from the express
const GetAllproducts = require('../controllers/getAllproducts');
const GetSingleProduct = require('../controllers/getSingleProduct');
const { ADD_REVIEW, IS_THE_PRODUCT_IS_PURCHES } = require('../controllers/addReview');
const CheckCredentials = require('../Middleware/CheckCredentials');

router.route('/').get(GetAllproducts)
router.route('/:id').get(GetSingleProduct)
router.route('/add-review/:id').get(CheckCredentials, IS_THE_PRODUCT_IS_PURCHES).post(ADD_REVIEW)

module.exports = router