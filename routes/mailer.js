const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Mailer rate limit config constants
const TIME_INTERVAL = 15 * 60 * 1000; // 15 min.
const SEND_MAIL_LIMIT = 1; // send mail action limit/userIP

let UsersIp = new Map();

setInterval(() => {
  UsersIp.clear();
}, TIME_INTERVAL);

const sendEmail = async ({ mailOptions, res }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res
          .status(502)
          .send("Failed to send email! Please try again later.");
      } else {
        console.log("Email set:", info);
        return res.status(250).send("Email Sent Successfully!");
      }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error! Please try again later.");
  }
};

router.post("/", function (req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .send("name, email, subject, and message are required in req. body");
    }

    // Rate limit req. by user IP (resets every 15 min.)
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const ipValue = UsersIp.get(ip) + 1;
    if (!ipValue) {
      UsersIp.set(ip, 1);
    } else if (ipValue > SEND_MAIL_LIMIT) {
      return res.status(429).send("Too Many Requests! Please try again later.");
    } else {
      UsersIp.delete(ip);
      UsersIp.set(ip, ipValue);
    }

    // Send mail logic
    let mailOptions = {
      from: email,
      to: "ammaralkhooly1@gmail.com",
      subject: `Portfolio Msg from ${name} (${email}) - ${subject}`,
      text: message,
    };
    sendEmail({ mailOptions, res });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error! Please try again later.");
  }
});

module.exports = router;
