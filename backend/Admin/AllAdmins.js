/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const ADMIN = require('../Models/AddNewAdmin'); // admin ====> "modal"
const useAdminWrapper = require('../Middleware/useAdminWrapper');

const GET_ALL_ADMINS = useAdminWrapper(async (req, res) => {
    try {
        if (req.admin) {
            const response = await ADMIN.find()
            res.status(200).json({ success: true, response })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

module.exports = GET_ALL_ADMINS