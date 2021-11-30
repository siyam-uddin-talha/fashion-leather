const express = require('express');
const stripePaymentAndOrder = require('../controllers/Payments/stripePaymentAndOrder');
const updateOrderPaymentStatus = require('../controllers/Payments/updateOrderPaymentStatus');
const cashOnDelevary = require('../controllers/Payments/cashOnDelevary');
const router = express.Router()


router.route('/stripe/payment').post(stripePaymentAndOrder)
router.route('/cash-on-delevary').post(cashOnDelevary)

router.route('/stripe/payment/update-status/:id').post(updateOrderPaymentStatus)


module.exports = router