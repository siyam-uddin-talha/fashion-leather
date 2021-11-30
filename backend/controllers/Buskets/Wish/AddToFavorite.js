/*
author:'Arnob Islam'
created date:'28-10-21'
description:''
*/

const Favorite = require('../../../Models/FavoriteProducts');

const ADD_TO_FAVORITE = async (req, res) => {
    try {
        const isThisUserFavIsCreated = await Favorite.find({
            "user.userId": {
                $eq: req.user._id.toString()
            }
        })

        if (isThisUserFavIsCreated.length !== 0) {
            // chack the product, is it already exist in thie Favorite ?
            const productExist = function (passid) {
                return isThisUserFavIsCreated[0].favoriteItems.some(function (el) {
                    return el._id.toString() === passid;
                });
            }


            if (productExist(req.body._id)) {

                try {
                    const filterdProduct = isThisUserFavIsCreated[0].favoriteItems.filter(e => e._id.toString() !== req.body._id)

                    const newFavItem = await Favorite.findByIdAndUpdate(
                        { _id: isThisUserFavIsCreated[0]._id.toString() }, { favoriteItems: filterdProduct }, { new: true, runValidators: true })
                    res.status(201).json({ success: true, favorite: newFavItem })
                } catch (error) {
                    res.status(404).json({ success: false, message: error.message })
                }
            } else {
                try {
                    const { favoriteItems } = isThisUserFavIsCreated[0]
                    const newFavItem = await Favorite.findByIdAndUpdate({
                        _id: isThisUserFavIsCreated[0]._id.toString()
                    }, { favoriteItems: [...favoriteItems, req.body] },
                        {
                            new: true, runValidators: true
                        })
                    res.status(201).json({ success: true, favorite: newFavItem })
                } catch (error) {
                    res.status(404).json({ success: false, message: error.message })
                }
            }

        } else {
            try {
                const newFavItem = await Favorite.create({
                    user: {
                        userId: req.user._id, userEmail: req.user.email,
                    },
                    favoriteItems: req.body
                })
                res.status(201).json({ success: true, favorite: newFavItem })
            } catch (error) {
                res.status(404).json({ success: false, message: error.message })
            }
        }
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}


module.exports = ADD_TO_FAVORITE