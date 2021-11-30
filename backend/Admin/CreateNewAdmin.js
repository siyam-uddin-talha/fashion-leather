/*
author:'Arnob Islam'
created date:'18-10-21'
description:'this will create/add new admin'
*/


const ADMIN = require('../Models/AddNewAdmin'); // admin ====> "modal"
const useAdminWrapper = require('../Middleware/useAdminWrapper');


const CREATE_NEW_ADMIN = useAdminWrapper(async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const isTheAdminExist = await ADMIN.findOne({ userName })
        if (isTheAdminExist) {
            res.json({ message: `admin exist!` })
        }
        if (!isTheAdminExist) {
            const response = await ADMIN.create({ userName, email, password })
            res.status(201).json({ success: true, response })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
})

module.exports = CREATE_NEW_ADMIN