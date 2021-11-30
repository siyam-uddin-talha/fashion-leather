/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const ORDER = require('../Models/Order');

const ORDER_NEW_PRODUCTS = async (req, res) => {
    try {
        const AlluserOrders = await ORDER.find({
            "owner.id": {
                $eq: req.user._id.toString()
            }
        })
        res.status(200).json({ success: true, orders: AlluserOrders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = ORDER_NEW_PRODUCTS