/*
author:'Arnob Islam'
created date:'17-10-21'
description:''
*/

const PRODUCT = require('../Models/Products');
const useAdminWrapper = require('../Middleware/useAdminWrapper');
const cloudinary = require('../config/cloudinary');

const UPDATE_PRODUCT = useAdminWrapper(async (req, res) => {
    const { id } = req.params

    const { title, price, discountPrice, description, stock, stockCount, catagory, images, keywords, timeStamp } = req.body

    let newImages = []
    let oldImages = []
    try {
        const findTheproduct = await PRODUCT.findById({ _id: id })

        findTheproduct.images.forEach(async (e, index) => {

            const cloudinaryDistroy = await cloudinary.uploader.destroy(`product-photo/${findTheproduct.timeStamp + index}`);
            oldImages.push(cloudinaryDistroy)

            if (oldImages.length === findTheproduct.images.length) {
                req.body.images.forEach(async (e, i) => {

                    try {
                        const newCloudinaryRes = await cloudinary.uploader.upload(e, { folder: `product-photo/`, public_id: req.body.timeStamp + i })

                        newImages.push(newCloudinaryRes.url)

                        if (newImages.length === req.body.images.length) {
                            const response = await PRODUCT.findByIdAndUpdate({ _id: id }, {
                                title, price, discountPrice, description, stock, stockCount, catagory, images: newImages, keywords, timeStamp
                            }, {
                                new: true,
                                runValidators: true
                            })

                            res.json({ success: true, product: response })
                        }
                    } catch (error) {
                        res.json({ success: false, message: error.message })

                    }


                })

            }

        })





    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = UPDATE_PRODUCT