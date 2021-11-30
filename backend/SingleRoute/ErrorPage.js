/*
author:'Arnob Islam'
created date:'16-10-21'
description:''
*/
const ErrorPage = (req, res, next) => res.status(404).json({ message: `nothing found` })