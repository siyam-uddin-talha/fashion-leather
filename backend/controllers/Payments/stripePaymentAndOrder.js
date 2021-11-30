const stripe = require('stripe')(`sk_test_51Js97hDJVgQGFCMTByv6spnAc7o0oiJ70KW5vI7tND5doC2wHZqaSLvdDJgwNqCszO8gdYgTVIoGKj1myvWNxnzX00gvTSpV8U`);

const ORDER = require('../../Models/Order');

const StirpePaymentAndOrder = async (req, res) => {
    const { amount, } = req.body
    const { order } = req.body


    try {

        // stripe
        const response = await stripe.paymentIntents.create({
            amount: amount,
            currency: "bdt",

        })

        // to create new order
        const newOrder = await ORDER.create({
            ...order,
            orderItems: order.orderItems,

            paymentInfo: {
                client_secret: response.client_secret,
                ...order.paymentInfo,
            },
            owner: {
                id: req.user._id, ownerEmail: req.user.email,
            }
        })



        res.status(200).json({ success: true, client: { client_secret: response.client_secret, fullName: `${req.user.firstName} ${req.user.lastName}`, email: req.user.email, }, order: newOrder })

    } catch (error) {
        res.json({ success: false, error: error.message })
    }
}

module.exports = StirpePaymentAndOrder