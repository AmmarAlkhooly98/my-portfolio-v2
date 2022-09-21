const response = require("../responses");
const { validEmail } = require("../utils");

const validateMailer = (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return response.failedWithMessage(
        "name, email, subject, and message are required in req. body",
        res
      );
    } else if (!validEmail(email)) {
      return response.failedWithMessage("Please input a valid email", res);
    } else {
      req.mailOptions = {
        from: email,
        to: "ammaralkhooly1@gmail.com",
        subject: `Portfolio Msg from ${name} (${email}) - ${subject}`,
        text: message,
      };
      next();
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
};

module.exports = {
  validateMailer,
};
