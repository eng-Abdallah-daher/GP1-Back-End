const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const sendEmail = (toEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 's12116027@stu.najah.edu',
      pass: 'gtgo zpdc mmzd jnoq',
    },
  });

  const mailOptions = {
    from: 's12116027@stu.najah.edu',
    to: toEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

router.post('/send-email', (req, res)=>{
  const { email, subject, message } = req.body;
    sendEmail(email, subject, message);
    res.status(200).json({ message: 'Email sent successfully' });
});

module.exports = router;
