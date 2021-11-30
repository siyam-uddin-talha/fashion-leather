/*
author:'Arnob Islam'
created date:'18-10-21'
description:'it will return all products from the database '
*/

const PRODUCT = require('../Models/Products');


const SHOW_ALL_PRODUCTS = async (req, res) => {
    try {
        const response = await PRODUCT.find({})
        res.status(200).json({ success: true, products: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = SHOW_ALL_PRODUCTS