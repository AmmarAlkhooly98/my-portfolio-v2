let express = require("express");
let router = express.Router();
let axios = require("axios");

const TIME_INTERVAL = 15 * 60 * 1000; // 15 min.
const SEND_MAIL_LIMIT = 2; // send mail action limit/userIP

let sendMail = new Map();

setInterval(() => {
  sendMail.clear();
}, TIME_INTERVAL);

async function sendEmail({ name, email, subject, message, res }) {
  const data = JSON.stringify({
    Messages: [
      {
        From: { Email: email, Name: name },
        To: [{ Email: "ammaralkhooly1@gmail.com", Name: "Ammar" }],
        Subject: subject,
        TextPart: message,
      },
    ],
  });

  const config = {
    method: "post",
    url: "https://api.mailjet.com/v3.1/send",
    data: data,
    headers: { "Content-Type": "application/json" },
    auth: {
      username: process.env.MAILJET_API_KEY,
      password: process.env.MAILJET_PRIVATE_KEY,
    },
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.status(200).send("Email Sent Successfully!");
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Server Error! Please try again later.");
    });
}

router.post("/sendemail", function (req, res) {
  // Rate limit req. by user IP (resets every 15 min.)
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const ipValue = sendMail.get(ip) + 1;
  if (!ipValue) {
    sendMail.set(ip, 1);
  } else if (ipValue > SEND_MAIL_LIMIT) {
    return res.status(403).send("forbidden");
  } else {
    sendMail.delete(ip);
    sendMail.set(ip, ipValue);
  }

  // Send mail logic
  const { name, email, subject, message } = req.body;
  sendEmail({ name, email, subject, message, res });
});

module.exports = router;
