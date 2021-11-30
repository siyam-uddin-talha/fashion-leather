

const ORDER = require('../Models/Order');

const PRODUCT = require('../Models/Products');


const IS_THE_PRODUCT_IS_PURCHES = async (req, res) => {
    const { id } = req.params
    try {
        const response = await ORDER.findOne({
            orderItems: {
                $elemMatch: {
                    _id: id
                }
            }
            ,
            "owner.id": {
                $eq: req.user._id.toString()
            },
            purches: true
        },
        )

        res.status(200).json({ success: true, response: response })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


const ADD_REVIEW = async (req, res) => {

    const { id } = req.params

    const { reviews, ratingScore, totalReviewCount } = req.body

    try {
        const response = await PRODUCT.findByIdAndUpdate({ _id: id }, { reviews, ratingScore, totalReviewCount }, {
            new: true,
            runValidators: true
        })
        res.status(201).json({ success: true, response })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


module.exports = { ADD_REVIEW, IS_THE_PRODUCT_IS_PURCHES }