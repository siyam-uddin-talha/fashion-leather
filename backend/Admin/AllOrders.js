/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/


const Order = require('../Models/Order');
const useAdminWrapper = require('../Middleware/useAdminWrapper');


const GET_SINGLE_ORDER = useAdminWrapper(async (req, res) => {
    const { id } = req.params

    try {
        const response = await Order.findOne({
            _id: id,
            purches: {
                $ne: true
            },
            'paymentInfo.success': {
                $ne: true
            }
        })
        res.status(200).json({ success: true, orders: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})


const GET_ALL_ORDERS_OF_THIS_MONTH = useAdminWrapper(async (req, res) => {
    try {
        const currentTimes = new Date()
        const curr_year = currentTimes.getFullYear()
        const curr_month = currentTimes.getMonth()

        const response = await Order.find({
            createdAt: {
                $gte: new Date(curr_year, curr_month,),
                $lt: new Date(curr_year, curr_month + 1,)
            },
            cancle: false,

        })
        res.status(200).json({ success: true, orders: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})


const ALL_SUCCESSFULL_ORDERS = useAdminWrapper(async (req, res) => {
    try {
        const response = await Order.find({
            purches: true,
            cancle: false,
            'paymentInfo.success': true
        })
        res.status(200).json({ success: true, orders: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})



const GET_TOTAL_CASTH = useAdminWrapper(async (req, res) => {
    try {
        const currentTimes = new Date()
        const curr_year = currentTimes.getFullYear()
        const curr_month = currentTimes.getMonth()


        const response = await Order.find({
            createdAt: {
                $gte: new Date(curr_year, curr_month,),
                $lt: new Date(curr_year, curr_month + 1,)
            },
            purches: true,
            cancle: false,
            'paymentInfo.success': true

        })
        res.status(200).json({ success: true, orders: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})


module.exports = { GET_SINGLE_ORDER, GET_ALL_ORDERS_OF_THIS_MONTH, GET_TOTAL_CASTH, ALL_SUCCESSFULL_ORDERS }