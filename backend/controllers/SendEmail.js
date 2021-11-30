/*
author:'Arnob Islam'
created date:'19-10-21'
description:''
*/

const nodemailer = require('nodemailer');


const SEND_EMAIL = async ({ email, subject, message, html }) => {
    try {


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({


            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'fashion.leather.2020@gmail.com',
                pass: 'fashionleather2020'
            }

        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: 'fashion.leather.2020@gmail.com', // sender address
            to: email, // list of receivers
            bcc: subject !== "password reset" ? 'mr.jocker909@gmail.com ' : "",
            cc: subject !== "password reset" ? 'fashionleather93@gmail.com' : "",
            subject: subject, // Subject line
            text: message, // plain text body
            html: `${html}`, // html body

        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = SEND_EMAIL