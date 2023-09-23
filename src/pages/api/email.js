"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Time Machine Hacks 🕰️ " <hr@techoptimum.org>', // sender address
    to: {submission.email},
    subject: "Welcome to Time Machine Hacks", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>



main().catch(console.error);
