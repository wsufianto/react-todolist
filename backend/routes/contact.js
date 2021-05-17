const router = require('express').Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  ignoreTLS: false,
  secure: false,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PWD
  }
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      sender: process.env.MAIL_LOGIN,
      to: process.env.MAIL_RECEIVER,
      subject: "Contact Form Message",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message:</p> <p>${message}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ code: 400, msg: "Email sent unsuccessfully" });
        console.log(error);
      } else {
        res.send({ code: 200, msg: "Email sent successfully" });
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (err) {
    console.log(err)
  }
});

module.exports = router
