/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const ORDER = require('../Models/Order');
const useAdminWrapper = require('../Middleware/useAdminWrapper');


const UPDATE_THE_PRODUCTS = useAdminWrapper(async (req, res) => {
    const { id } = req.params

    try {
        const AlluserOrders = await ORDER.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({ success: true, orders: AlluserOrders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = UPDATE_THE_PRODUCTS