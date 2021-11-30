/*
author:'Arnob Islam'
created date:'18-10-21'
description:''
*/

const User = require('../Models/User');
const cloudinary = require('../config/cloudinary');
const bcryptjs = require('bcryptjs');


const UPDATE_USER_DATA = async (req, res) => {
    const { _id, } = req.body
    try {
        if (req.body.photoUrl) {

            const findUser = await User.findById({ _id })

            if (findUser.photoUrl) {
                // deleting the provious image
                const cloudDistroy = await cloudinary.uploader.destroy(`profile-photo/${req.user.email}`)

                if (cloudDistroy.result === 'ok') {
                    //uploading new image
                    const cloudinaryRes = await cloudinary.uploader.upload(req.body.photoUrl, { folder: `profile-photo/`, public_id: req.user.email })

                    const updatedData = await User.findByIdAndUpdate({ _id }, { firstName: req.body.firstName, lastName: req.body.lastName, photoUrl: cloudinaryRes.url }, {
                        new: true,
                        runValidators: true
                    })

                    res.status(201).json({
                        success: true, updatedData
                    })
                    return;
                }


            }

            else if (!findUser.photoUrl) {

                const cloudinaryRes = await cloudinary.uploader.upload(req.body.photoUrl, { folder: `profile-photo/`, public_id: req.user.email })

                const updatedData = await User.findByIdAndUpdate({ _id }, { firstName: req.body.firstName, lastName: req.body.lastName, photoUrl: cloudinaryRes.url }, {
                    new: true,
                    runValidators: true
                })

                res.status(201).json({
                    success: true, updatedData
                })
                return;

            }

        }

        // password sequire
        if (req.body.password) {
            const bcryptPass = await bcryptjs.hash(req.body.password, 12)

            const updatedData = await User.findByIdAndUpdate({ _id }, { firstName: req.body.firstName, lastName: req.body.lastName, password: bcryptPass }, {
                new: true,
                runValidators: true
            })

            res.status(201).json({
                success: true, updatedData
            })
            return;

        }

        else {
            const updatedData = await User.findByIdAndUpdate({ _id }, { firstName: req.body.firstName, lastName: req.body.lastName, }, {
                new: true,
                runValidators: true
            })

            res.status(201).json({
                success: true, updatedData
            })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

module.exports = UPDATE_USER_DATA
