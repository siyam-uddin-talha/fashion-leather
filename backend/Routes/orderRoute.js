/*
author:'Arnob Islam'
created date:'18-10-21'
description:'this file export the user authentication routes'
*/

const express = require('express');
const router = express.Router() // requireing the Router from the express


const OrderProduct = require('../controllers/orderTheProduct');
const UserAllOrders = require('../controllers/userAllOrders');
const CancleOrder = require('../controllers/cancelOrder');
const userSingleOrder = require('../controllers/userSingleOrder');
const updateOrder = require('../controllers/updateOrder');


router.route('/my/all-orders').get(UserAllOrders)
router.route('/my/orders/:id').get(userSingleOrder).put(updateOrder).post(CancleOrder)
router.route('/new-product').post(OrderProduct)


module.exports = router