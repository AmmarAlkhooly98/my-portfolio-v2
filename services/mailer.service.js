const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  try {
    return new Promise((resolve, reject) => {
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
          return resolve(false);
        } else {
          console.log("Email sent:", info);
          resolve(true);
        }
      });
    })
      .then((sent) => {
        console.log(sent);
        return sent
          ? { code: 0, data: "Email Sent Successfully!" }
          : {
              code: 1,
              data: "Failed to send email! Please try again later.",
            };
      })
      .catch((e) => {
        console.error(e);
        return { code: 2, data: "Server Error! Please try again later." };
      });
  } catch (e) {
    console.error(e);
    return { code: 2, data: "Server Error! Please try again later." };
  }
};

module.exports = {
  sendEmail,
};
