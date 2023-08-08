import nodemailer from 'nodemailer';

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env
    })
}