/*
author:'Arnob Islam'
created date:'17-10-21'
description:''
*/

const PRODUCT = require('../Models/Products');
const cloudinary = require('../config/cloudinary');
const useAdminWrapper = require('../Middleware/useAdminWrapper');


const CREATE_PRODUCTS = useAdminWrapper(async (req, res) => {
    const { title, price, discountPrice, description, stock, stockCount, catagory, images, keywords, timeStamp } = req.body
    let allImageResponseUrl = []

    try {
        images.forEach(async (e, i) => {
            try {
                const cloudinaryRes = await cloudinary.uploader.upload(e, { folder: `product-photo/`, public_id: timeStamp + i })

                allImageResponseUrl.push(cloudinaryRes.url)

                if (allImageResponseUrl.length === images.length) {

                    const response = await PRODUCT.create({ title, price, discountPrice, description, stock, stockCount, catagory, images: allImageResponseUrl, keywords, timeStamp })
                    res.status(200).json({ success: true, response })
                }
            } catch (error) {
                res.status(404).json({ success: false, message: error.message })
            }
        })

    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}
)
module.exports = { CREATE_PRODUCTS }