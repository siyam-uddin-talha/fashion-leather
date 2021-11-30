/*
author:'Arnob Islam'
created date:'16-10-2021'
description:'Main Backend file of Fashion Leather '
*/

const express = require('express'); // requireing  the express
const cookieParser = require("cookie-parser"); // requireing the cookie-parser
const path = require('path');

const User = require('./backend/Routes/userAuthRoute');
const InitialRoute = require('./backend/Routes/UserRoute');
const AdminRoute = require('./backend/Routes/adminRoute');
const ProductRoute = require('./backend/Routes/productRoute');
const OrderAndProducts = require('./backend/Routes/orderRoute');
const paymentAndOrderRoute = require('./backend/Routes/paymentAndOrderRoute');

//custom middlewares
const AdminMiddleWare = require('./backend/Middleware/AdminMiddleWare');
const CheckCredentials = require('./backend/Middleware/CheckCredentials');

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config();
}


// initialize the mongodb database 
require('./backend/app')

const app = express() // initial the express 

// app.use(ErrorPage)
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));




app.use('/user', User) // login, signup , forget password, reset password
app.use('/api/home', CheckCredentials, InitialRoute) // cheack the user is login or not
app.use('/api/products', ProductRoute) // to display or show the products to frontend
app.use('/api/order/', CheckCredentials, OrderAndProducts) // user can order products
app.use('/api/payment/', CheckCredentials, paymentAndOrderRoute) // payment and order route

app.use('/api/admin/', AdminMiddleWare, AdminRoute) // it can access only admins


/*
*********************   Admin ******************
*/
app.use("/admin/dashbord", express.static(path.join(__dirname, './Dashbord/build')));

app.get('/admin/dashbord/*', function (req, res) {
    res.sendFile(path.join(__dirname, './Dashbord/build', 'index.html'));
});




/*
*********************   Client  ******************
*/
// front-end 
app.use("/", express.static(path.join(__dirname, "./FrontEnd/build")))
// front-end index file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./FrontEnd/build/index.html"))
})






// host name or port address
const PORT_ADDRESS = process.env.PORT

app.listen(PORT_ADDRESS, () => {
    console.log(`listening at ${PORT_ADDRESS}`);
})



