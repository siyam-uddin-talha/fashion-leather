/*
author:'Arnob Islam'
created date:'17-10-21'
description:''
*/

const PRODUCT = require('../Models/Products');
const useAdminWrapper = require('../Middleware/useAdminWrapper');
const cloudinary = require('../config/cloudinary');

const DELETE_MANY_PRODUCTS = useAdminWrapper(async (req, res) => {
    const { ids } = req.body // ids return a Array 
    let cloudinaryResult = []
    try {
        const findTheproduct = await PRODUCT.find({ _id: { $in: ids } })

        const totalImg = findTheproduct.reduce((acc, i) => acc + i.images.length, 0)

        findTheproduct.forEach((e, i) => {
            e.images.forEach(async (img, index) => {
                try {
                    const cloudinaryDistroy = await cloudinary.uploader.destroy(`product-photo/${e.timeStamp + index}`);
                    cloudinaryResult.push(cloudinaryDistroy)

                    if (cloudinaryResult.length === totalImg) {
                        // example  deleteMany({ _id: { $in: [filter-1,filter-2,filter-3] } })
                        const response = await PRODUCT.deleteMany({ _id: { $in: ids } })
                        res.json({ success: true, response })

                    }

                } catch (error) {
                    res.json({ success: false, message: error.message })

                }
            })


        })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }
})

module.exports = DELETE_MANY_PRODUCTS