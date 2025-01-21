const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
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
router.post('/send-email-with-pdf', (req, res)=>{
  const { shopName, userName, cost, recipientEmail} = req.body;
    EmailService.sendEmailWithFee( shopName, userName, cost, recipientEmail);
    res.status(200).json({ message: 'Email sent successfully' });
});


class EmailService {
  static async sendEmailWithFee(shopName, userName, cost, recipientEmail) {
    try {
   
      const pdfPath = path.join(__dirname, "service_fee.pdf");
      const doc = new PDFDocument({ margin: 50 });
      doc
        .image("data:image/png;base64,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", 50, 30, { width: 50 }) 
        .fillColor("#000080")
        .fontSize(24)
        .text("Service Fee Receipt", 110, 40, { align: "center" })
        .fontSize(10)
        .fillColor("gray")
        .text(new Date().toLocaleString(), 450, 50, { align: "right" })
        .moveDown(2);

      doc
        .moveTo(50, 100)
        .lineTo(550, 100)
        .stroke("#000080");

     
      doc
        .moveDown(1.5)
        .fontSize(16)
        .fillColor("#000")
        .text(`Shop Name: `, { continued: true })
        .fillColor("#000080")
        .text(shopName, { underline: true })
        .moveDown()
        .fillColor("#000")
        .text(`User Name: `, { continued: true })
        .fillColor("#000080")
        .text(userName, { underline: true })
        .moveDown()
        .fillColor("#000")
        .text(`Cost: `, { continued: true })
        .fillColor("#000080")
        .text(`$${cost}`, { underline: true });

   
      doc
        .moveDown(2)
        .fillColor("#000")
        .fontSize(14)
        .moveDown()
        .text("Service Fee: ", { continued: true })
        .fillColor("#000080")
        .text(`$${cost}`)
        .fillColor("#000")
        .moveDown();

     
      doc
        .fontSize(10)
        .fillColor("gray")
        .text(
          "Thank you for choosing our service!",
          50,
          700,
          { align: "center" }
        )
        .text(
          "For any inquiries, contact abdallahdaher205@gmail.com",
          50,
          715,
          { align: "center" }
        );

      
      doc
        .moveTo(50, 680)
        .lineTo(550, 680)
        .stroke("#000080");

     
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.end();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "s12116027@stu.najah.edu",
          pass: "gtgo zpdc mmzd jnoq",
        },
      });

      const mailOptions = {
        from: "s12116027@stu.najah.edu",
        to: recipientEmail,
        subject: "Service Fee Receipt",
        text: "Please find attached the service fee receipt.",
        attachments: [
          {
            filename: "service_fee.pdf",
            path: pdfPath,
          },
        ],
      };

      
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);

      
      fs.unlinkSync(pdfPath);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
module.exports = router
