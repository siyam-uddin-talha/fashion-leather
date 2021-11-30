/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/


const PRODUCT = require('../Models/Products');
const useAdminWrapper = require('../Middleware/useAdminWrapper');


const GET_SINGLE_PRODUCT = useAdminWrapper(async (req, res) => {
    const { id } = req.params
    try {
        const response = await PRODUCT.findById({ _id: id })
        res.status(200).json({ success: true, product: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

const GET_ALL_PRODUCTS = useAdminWrapper(async (req, res) => {
    try {
        const response = await PRODUCT.find()
        res.status(200).json({ success: true, products: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS }