/*
author:'Arnob Islam'
created date:'28-10-21'
description:''
*/

const Cart = require("../../../Models/CartProducts")

const GET_CART_DATA = async (req, res) => {
    try {
        const userCartProducts = await Cart.findOne({
            "user.userId": {
                $eq: req.user._id.toString()
            }
        })
        res.status(200).json({ success: true, cart: userCartProducts })
    } catch (error) {
        res.status(404).json({ success: false, })

    }
}

module.exports = GET_CART_DATA