require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    },
});

const sendEmail = async (email, subject, body, callback) => {
    const result = await transporter.sendMail({
        to: email,
        subject,
        html: body,
    });

    console.log(result);

    callback();
};

module.exports = { sendEmail };
