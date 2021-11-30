/*
author:'Arnob Islam'
created date:'28-10-21'
description:''
*/

const Favorite = require('../../../Models/FavoriteProducts');

const GET_FAVORITE_DATA = async (req, res) => {
    try {
        const userCartProducts = await Favorite.findOne({
            "user.userId": {
                $eq: req.user._id.toString()
            }
        })
        res.status(200).json({ success: true, favorite: userCartProducts })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })

    }
}

module.exports = GET_FAVORITE_DATA