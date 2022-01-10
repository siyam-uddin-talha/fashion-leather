/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/
const stripe = require('stripe')(`key`);

const ORDER = require('../../Models/Order');
const NOTIFICATION = require('../../Models/Notifications');
const SendEmail = require('../SendEmail');


const UPDATE_ORDER = async (req, res) => {
    const { id } = req.params

    const { cardId } = req.body

    try {

        if (cardId) {
            await stripe.paymentIntents.confirm(
                cardId,

            );
        }

        // find the order
        const spacificOrder = await ORDER.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })


        // find notification 
        const isThisUserNotificationSchemaIsCreated = await NOTIFICATION.find({
            "to.id": {
                $eq: req.user._id.toString()
            }
        })

        // if the current user notification created it wiil add a new notification
        if (isThisUserNotificationSchemaIsCreated.length !== 0) {
            const { notifications } = isThisUserNotificationSchemaIsCreated[0]

            await NOTIFICATION.findByIdAndUpdate({ _id: isThisUserNotificationSchemaIsCreated[0]._id.toString() }, {
                notifications: [
                    ...notifications, { title: 'Your order is placed' }
                ]
            }, {
                new: true,
                runValidators: true
            })
            await SendEmail({
                email: req.user.email,
                subject: 'New order',
                message: `Your order is placed`,
                html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> Order number #${spacificOrder._id} </h2>
        </div>
        <div>
            <h3> spend: ${spacificOrder.totalPrice} </h2>
        </div>
        <div>
            Address : ${spacificOrder.shippingInfo.address} ${spacificOrder.shippingInfo.city} ${spacificOrder.shippingInfo.zip} ${spacificOrder.shippingInfo.state}
            <br>
            phone: ${spacificOrder.shippingInfo.phoneNo}
        </div>

        <div>
            <h5>
                we will contact you after product is ready
            </h5>
        </div>
    </div>`
            })
            res.status(201).json({ success: true, order: spacificOrder })
        }

        // if the current user notification is not created it will up create new one
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
            await SendEmail({
                email: req.user.email,
                subject: 'New order',
                message: `Your order is placed`,
                html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> Order number #${spacificOrder._id} </h2>
        </div>
        <div>
            <h3> spend: ${spacificOrder.totalPrice} </h2>
        </div>
        <div>
            Address : ${spacificOrder.shippingInfo.address} ${spacificOrder.shippingInfo.city} ${spacificOrder.shippingInfo.zip} ${spacificOrder.shippingInfo.state}
            <br>
            phone: ${spacificOrder.shippingInfo.phoneNo}
        </div>

        <div>
            <h5>
                we will contact you after product is ready
            </h5>
        </div>
    </div>`
            })

            res.status(201).json({ success: true, order: spacificOrder })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = UPDATE_ORDER
