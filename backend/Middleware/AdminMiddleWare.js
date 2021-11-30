/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const jwt = require("jsonwebtoken")
const ADMIN = require('../Models/AddNewAdmin');

const ADMIN_MIDDLEWARE = async (req, res, next) => {
    try {
        const token = req.cookies.admintoken
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY_FOR_ADMIN)
        const response = await ADMIN.findOne({ _id: verify.id })

        if (response._id.toString() === verify.id) {
            req.admin = true
            next()
        } else {
            req.admin = false
            next()
            // res.json({ success: false, message: 'not login' })
        }
    } catch (error) {
        if (error.message === 'jwt must be provided') {
            // res.json({ message: 'not login' })
            next()
        } else {
            res.json({ message: 'not login' })
        }


    }
}

module.exports = ADMIN_MIDDLEWARE