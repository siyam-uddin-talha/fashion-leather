/*
author:'Arnob Islam'
created date:'16-10-21'
description:'this file export the user authentication routes'
*/

const express = require('express');
const router = express.Router() // requireing the Router from the express
const { REGISTER_NEW_USER, LOGIN, LOG_OUT } = require('../Auth/app');
const FORGET_PASSOWORD = require('../Auth/userForgetPassword');
const RESET_PASSWORD = require('../Auth/resetThePasword');

router.route('/signup').post(REGISTER_NEW_USER)
router.route('/login').post(LOGIN)
router.route('/logout').get(LOG_OUT)

router.route('/forget-password').post(FORGET_PASSOWORD)
router.route('/reset-password/:resetToken').post(RESET_PASSWORD)


module.exports = router