/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/
const stripe = require('stripe')(`sk_test_51Js97hDJVgQGFCMTByv6spnAc7o0oiJ70KW5vI7tND5doC2wHZqaSLvdDJgwNqCszO8gdYgTVIoGKj1myvWNxnzX00gvTSpV8U`);

const ORDER = require('../Models/Order');
const NOTIFICATION = require('../Models/Notifications');
const SendEmail = require('./SendEmail');


const CANCLE_THE_ORDER = async (req, res) => {
    const { id } = req.params
    const { cardId } = req.body
    try {

        if (cardId) {
            await stripe.refunds.create({
                payment_intent: cardId,
            });
        }

        const cancededOrder = await ORDER.findByIdAndUpdate({ _id: id }, { cancle: true },
            {
                new: true,
                runValidators: true
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
                    ...notifications, { title: 'You canceld your order' }
                ]
            }, {
                new: true,
                runValidators: true
            })

            await SendEmail({
                email: req.user.email,
                subject: 'Cancellation',
                message: `You cancele your order`,
                html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> You cancle Your order </h2>
            <br>
            <h3> Order number #${cancededOrder._id} </h2>
        </div>
        <div>
            <h3>Your total spend spend: ${cancededOrder.totalPrice} </h2>
        </div>
      
        <div>
            <h5>
               Keep with use
            </h5>
        </div>
    </div>`
            })

            res.status(201).json({ success: true, order: cancededOrder })
        } else {
            await NOTIFICATION.create({
                to: {
                    id: req.user._id, email: req.user.email,
                },
                notifications: [
                    {
                        title: 'You canceld your order'
                    }
                ]
            })
            await SendEmail({
                email: req.user.email,
                subject: 'Cancellation',
                message: `You cancele your order`,
                html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> You cancle Your order </h2>
            <br>
            <h3> Order number #${cancededOrder._id} </h2>
        </div>
        <div>
            <h3>Your total spend spend: ${cancededOrder.totalPrice} </h2>
        </div>
      
        <div>
            <h5>
               Keep with use
            </h5>
        </div>
    </div>`
            })
            res.status(201).json({ success: true, order: cancededOrder })
        }


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = CANCLE_THE_ORDER