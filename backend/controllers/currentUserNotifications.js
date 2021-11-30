/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/


const NOTIFICATION = require('../Models/Notifications');


const CURRENT_USER_NOTIFICATION = async (req, res) => {

    try {

        const currentUsernotifications = await NOTIFICATION.find({
            "to.id": {
                $eq: req.user._id.toString()
            }
        })
        res.status(200).json({ success: true, userNotification: currentUsernotifications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = CURRENT_USER_NOTIFICATION