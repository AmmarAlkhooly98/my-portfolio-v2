const response = require("../responses");

// Mailer rate limit config constants
const TIME_INTERVAL = 30 * 60 * 1000; // 20 min.
const SEND_MAIL_LIMIT = 1; // send mail action limit/userIP

const USERS_IP = new Map();

setInterval(() => {
  USERS_IP.clear();
}, TIME_INTERVAL);

const rateLimit = (req, res, next) => {
  try {
    // Rate limit req. by user IP (resets every 15 min.)
    const ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
    const ipValue = USERS_IP.get(ip) + 1;
    if (!ipValue) {
      USERS_IP.set(ip, 1);
      next();
    } else if (ipValue > SEND_MAIL_LIMIT) {
      return response.tooManyRequests(res);
    } else {
      USERS_IP.delete(ip);
      USERS_IP.set(ip, ipValue);
      next();
    }
  } catch (e) {
    console.error(e);
    return response.serverError(res);
  }
};

module.exports = {
  rateLimit,
};
