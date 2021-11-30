/*
author:'Arnob Islam'
created date:'16-10-21'
description:'this file will provide the admin login functionalities to check the admin by the username and password'
*/
const ADDMIN = require('../Models/AddNewAdmin'); // admin ====> "modal"
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



const ADMIN_LOGIN = async (req, res) => {
    const { userName, password } = req.body
    try {

        const response = await ADDMIN.findOne({ userName })

        if (!response) {
            return res.json({ message: 'admin is not exist' })
        }
        const byres = await bcryptjs.compare(password, response.password)

        if (byres) {
            const adminToken = jwt.sign({ id: response._id }, process.env.JWT_SECRET_KEY_FOR_ADMIN, {
                expiresIn: '1d'
            })
            res.cookie('admintoken', adminToken, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            })
            res.status(200).json({ success: true, message: 'admin login success', adminToken })
        } else {
            res.json({ success: false, message: 'Wrong password' })
        }

    } catch (error) {
        res.json({ message: error.message, success: false })
    }
}

module.exports = ADMIN_LOGIN