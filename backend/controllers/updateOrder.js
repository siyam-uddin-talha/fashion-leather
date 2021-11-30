/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const ORDER = require('../Models/Order');


const updateOrder = async (req, res) => {
    const { id } = req.params

    try {
        const updtated = await ORDER.findByIdAndUpdate({ _id: id }, { shippingInfo: req.body }, {
            new: true,
            runValidators: true
        })

        res.status(201).json({ success: true, updtated })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = updateOrder