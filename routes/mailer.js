var express = require("express");
var router = express.Router();

async function sendEmail(name, email, subject, message, res) {
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

// define your own email api which points to your server.
router.post("/api/sendemail/", function (req, res) {
  const { name, email, subject, message } = req.body;
  //todo: implement your spam protection or checks.
  sendEmail(name, email, subject, message, res);
});

module.exports = router;
