/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const ORDER = require('../Models/Order');
const NOTIFICATION = require('../Models/Notifications');

const ORDER_NEW_PRODUCTS = async (req, res) => {
    const { orderItems, shippingInfo, paymentInfo, shippingPrice, totalPrice } = req.body

    try {
        const newOrder = await ORDER.create({
            orderItems, shippingInfo, paymentInfo, shippingPrice, totalPrice, owner: {
                id: req.user._id, ownerEmail: req.user.email,
            }
        })


        const isThisUserNotificationSchemaIsCreated = await NOTIFICATION.find({
            "to.id": {
                $eq: req.user._id.toString()
            }
        })

        if (isThisUserNotificationSchemaIsCreated.length !== 0) {
            const { notifications } = isThisUserNotificationSchemaIsCreated[0]

            const newNotifications = await NOTIFICATION.findByIdAndUpdate({ _id: isThisUserNotificationSchemaIsCreated[0]._id.toString() }, {
                notifications: [
                    ...notifications, { title: 'Your order is placed' }
                ]
            }, {
                new: true,
                runValidators: true
            })
            res.status(201).json({ success: true, Notify: newNotifications, order: newOrder })
        }
        else {
            await NOTIFICATION.create({
                to: {
                    id: req.user._id, email: req.user.email,
                },
                notifications: [
                    {
                        title: 'your new order is placed'
                    }
                ]
            })
            res.status(201).json({ success: true, order: newOrder })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = ORDER_NEW_PRODUCTS