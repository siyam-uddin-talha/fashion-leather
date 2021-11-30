/*
author:'Arnob Islam'
created date:'18-10-21'
description:'it will return singl product fitering by id '
*/

const PRODUCT = require('../Models/Products');


const SHOW_ALL_PRODUCTS = async (req, res) => {
    const { id } = req.params
    try {
        const response = await PRODUCT.findById({ _id: id })
        res.status(200).json({ success: true, products: response })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

module.exports = SHOW_ALL_PRODUCTS