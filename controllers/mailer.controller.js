const { sendEmail } = require("../services/mailer.service");
const response = require("../responses");

const postMail = async (req, res) => {
  try {
    const { mailOptions } = req;
    const result = await sendEmail(mailOptions);
    if (result?.code === 0) {
      return response.emailSent(res);
    } else if (result?.code === 1) {
      return response.badGateway(result.data, res);
    } else {
      return response.serverError(res);
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
};

module.exports = {
  postMail,
};
