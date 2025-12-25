const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

module.exports.sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from: '"VPQ Studio" <' + process.env.MAIL_USER + '>',
        to,
        subject,
        html
    });
};
