/*
author:'Arnob Islam'
created date:'17-10-21'
description:''
*/

const PRODUCT = require('../Models/Products');
const useAdminWrapper = require('../Middleware/useAdminWrapper');
const cloudinary = require('../config/cloudinary');

const DELETE_SINGLE_PRODUCT = useAdminWrapper(async (req, res) => {
    const { id } = req.params
    let empty = []
    try {

        const findTheproduct = await PRODUCT.findById({ _id: id })
        if (findTheproduct) {
            findTheproduct.images.forEach(async (e, i) => {

                try {

                    const distroyRes = await cloudinary.uploader.destroy(`product-photo/${findTheproduct.timeStamp + i}`);
                    empty.push(distroyRes)

                    if (empty.length === findTheproduct.images.length) {
                        const response = await PRODUCT.deleteOne({ _id: id })
                        res.json({ success: true, response })
                    }

                } catch (error) {
                    res.json({ success: false, message: error.message })

                }


            })

        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = DELETE_SINGLE_PRODUCT