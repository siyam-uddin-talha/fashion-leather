/*
author:'Arnob Islam'
created date:'16-10-21'
description:''
*/

const express = require('express');
const router = express.Router() // requireing the Router from the express
const { HOME } = require('../SingleRoute/home');

// =========== user ================
const updateUserData = require('../controllers/updateUserData');
// =========== user ================

// ============= cart ==============
const AddToCart = require('../controllers/Buskets/Cart/AddToCart');
const GetCartPrducts = require('../controllers/Buskets/Cart/GetCartPrducts');
// ============= cart ==============

// ============= favorite ==============
const AddToFavorite = require('../controllers/Buskets/Wish/AddToFavorite');
const GetFavoriteProducts = require('../controllers/Buskets/Wish/GetFavoriteProducts');
// ============= favorite ==============

// ============= notification ==============
const currentUserNotifications = require('../controllers/currentUserNotifications');


router.get('/', HOME) // home
router.route('/update-user').post(updateUserData) // update user
router.route('/cart').get(GetCartPrducts).post(AddToCart) // cart 
router.route('/favorite').get(GetFavoriteProducts).post(AddToFavorite) // favorite
router.route('/notifications').get(currentUserNotifications) // notifications


module.exports = router