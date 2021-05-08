import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const mail = (name, email) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ETH_USER, // generated ethereal user
            pass: process.env.ETH_PASS, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailDetails = {
        from: process.env.ETH_USER, // sender address
        to: `${email}`, //receiver
        subject: `Khidki`, // Subject line
        text: `Welcome ${name}, You have successfull registered on Khidki`, // plain text body
        html: "<b>Welcome, Registration Successfull</b>", // html body
    }

    transporter.sendMail(mailDetails, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}