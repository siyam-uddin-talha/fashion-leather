/*
author:'Arnob Islam'
created date:'17-10-21'
description:'this file export the user authentication products and admin routes '
*/

const express = require('express');
const router = express.Router() // requireing the Router from the express

const { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS } = require('../Admin/AllProducts'); // get the all e-commerce products, those are available on live
const { CREATE_PRODUCTS } = require('../Admin/AddProducts'); // creating new e-commerce products
const UPDATE_PRODUCT = require('../Admin/UpdataProduct'); // update the e-commerce products
const DELETE_SINGLE_PRODUCT = require('../Admin/DeleteSingleProducts'); // delete by one/single e-commerce products
const DELETE_MANY_PRODUCTS = require('../Admin/DeleteManyProducts'); // delete many /single e-commerce products

const { GET_ALL_ORDERS_OF_THIS_MONTH, GET_TOTAL_CASTH, ALL_SUCCESSFULL_ORDERS, GET_SINGLE_ORDER } = require('../Admin/AllOrders');
const GET_ALL_ADMINS = require('../Admin/AllAdmins'); // return all admins 
const ADMIN_LOGIN = require('../Admin/AdminLogin'); // to login the only admins 
const CREATE_NEW_ADMIN = require('../Admin/CreateNewAdmin'); // to create new admins
const UpdateOrder = require('../Admin/UpdateOrder');


router.route('/all-orders').get(GET_ALL_ORDERS_OF_THIS_MONTH)
router.route('/successful-orders').get(ALL_SUCCESSFULL_ORDERS)
router.route('/all-orders/cash').get(GET_TOTAL_CASTH)
router.route('/order-single/:id').get(GET_SINGLE_ORDER).put(UpdateOrder)

router.route('/single-product/:id').get(GET_SINGLE_PRODUCT)
router.route('/all-products').get(GET_ALL_PRODUCTS)
router.route('/create-new-products').post(CREATE_PRODUCTS)
router.route('/modify-product/:id').put(UPDATE_PRODUCT).delete(DELETE_SINGLE_PRODUCT)
router.route('/modify-product/').put(DELETE_MANY_PRODUCTS)


router.route('/login').post(ADMIN_LOGIN)
router.route('/register').post(CREATE_NEW_ADMIN)
router.route('/details').get(GET_ALL_ADMINS)


module.exports = router