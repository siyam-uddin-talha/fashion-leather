/*
author:'Arnob Islam'
created date:'28-10-21'
description:''
*/

const Cart = require('../../../Models/CartProducts');

const ADD_TO_CART = async (req, res) => {

    try {
        const isThisUserCartIsCreated = await Cart.find({
            "user.userId": {
                $eq: req.user._id.toString()
            }
        })

        if (isThisUserCartIsCreated.length !== 0) {
            // chack the product, is it already exist in thie cart ?
            const productExist = function (passid) {
                return isThisUserCartIsCreated[0].cartItems.some(function (el) {
                    return el._id === passid;
                });
            }
            if (productExist(req.body._id)) {
                try {
                    const filterdProduct = isThisUserCartIsCreated[0].cartItems.filter(e => e._id !== req.body._id)
                    const newCartItem = await Cart.findByIdAndUpdate(
                        { _id: isThisUserCartIsCreated[0]._id.toString() }, { cartItems: filterdProduct }, { new: true, runValidators: true })
                    res.status(201).json({ success: true, cart: newCartItem })
                } catch (error) {
                    res.status(404).json({ success: false, message: error.message })
                }
            } else {
                try {
                    const { cartItems } = isThisUserCartIsCreated[0]

                    const newCartItem = await Cart.findByIdAndUpdate({
                        _id: isThisUserCartIsCreated[0]._id.toString()
                    }, { cartItems: [...cartItems, req.body] },
                        {
                            new: true, runValidators: true
                        })
                    res.status(201).json({ success: true, cart: newCartItem })
                } catch (error) {
                    res.status(404).json({ success: false, message: error.message })

                }
            }

        } else {
            try {
                const newCartItem = await Cart.create({
                    user: {
                        userId: req.user._id, userEmail: req.user.email,
                    },
                    cartItems: req.body
                })
                res.status(201).json({ success: true, cart: newCartItem })
            } catch (error) {
                res.status(404).json({ success: false, message: error.message })
            }

        }
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}


module.exports = ADD_TO_CART