/*
author:'Arnob Islam'
created date:'19-10-21'
description:''
*/

const ORDER = require('../Models/Order');

const USER_SINGLE_ORDER = async (req, res) => {
    const { id } = req.params
    try {
        const userSingleOrder = await ORDER.findById({ _id: id })
        res.status(200).json({ success: true, orders: userSingleOrder })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = USER_SINGLE_ORDER