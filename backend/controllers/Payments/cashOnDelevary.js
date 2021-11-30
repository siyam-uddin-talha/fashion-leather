
const ORDER = require('../../Models/Order');
const NOTIFICATION = require('../../Models/Notifications');

const SendEmail = require('../SendEmail');

const CashOnDelevaryAndOrder = async (req, res) => {
    const { order } = req.body


    try {

        // to create new order
        const newOrder = await ORDER.create({
            ...order,
            orderItems: order.orderItems,

            paymentInfo: {
                ...order.paymentInfo,
            },
            owner: {
                id: req.user._id, ownerEmail: req.user.email,
            }
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
            <h3> Order number #${newOrder._id} </h2>
        </div>
        <div>
            <h3> spend: ${newOrder.totalPrice} </h2>
        </div>
        <div>
            Address : ${newOrder.shippingInfo.address} ${newOrder.shippingInfo.city} ${newOrder.shippingInfo.zip} ${newOrder.shippingInfo.state}
            <br>
            phone: ${newOrder.shippingInfo.phoneNo}
        </div>

        <div>
            <h5>
                we will contact you after product is ready
            </h5>
        </div>
    </div>`
            })
            res.status(201).json({ success: true, order: newOrder })
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
            <h3> Order number #${newOrder._id} </h2>
        </div>
        <div>
            <h3> spend: ${newOrder.totalPrice} </h2>
        </div>
        <div>
            Address : ${newOrder.shippingInfo.address} ${newOrder.shippingInfo.city} ${newOrder.shippingInfo.zip} ${newOrder.shippingInfo.state}
            <br>
            phone: ${newOrder.shippingInfo.phoneNo}
        </div>

        <div>
            <h5>
                we will contact you after product is ready
            </h5>
        </div>
    </div>`
            })

            res.status(201).json({ success: true, order: newOrder })
        }


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = CashOnDelevaryAndOrder