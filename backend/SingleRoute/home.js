/*
author:'Arnob Islam'
created date:'16-10-21'
description:''
*/

const HOME = (req, res,) => {
    const { email, _id, firstName, createdAt, lastName, dateOfBirth, photoUrl } = req.user
    res.send({ _id, email, firstName, lastName, createdAt, dateOfBirth, photoUrl })

}

module.exports = { HOME }