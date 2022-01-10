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
                user: '****',
                pass: '****'
            }

        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: '******', // sender address
            to: email, // list of receivers
            bcc: subject !== "****",
            cc: subject !== "****",
            subject: subject, // Subject line
            text: message, // plain text body
            html: `${html}`, // html body

        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = SEND_EMAIL
