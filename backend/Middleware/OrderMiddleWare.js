/*
author:'Arnob Islam'
created date:'16-10-21'
description:''
*/

const jwt = require("jsonwebtoken")
const USER = require('../Models/User');

const CHECK_CREDENTIALS = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const response = await USER.findOne({ _id: verify.id })
        req.token = token
        req.user = response
        next()

    } catch (error) {
        if (error.message === 'jwt must be provided') {
            req.user = { message: 'not login' }
        }
    }
}

module.exports = CHECK_CREDENTIALS