exports.failedWithMessage = (msg, res) => {
  let response = {
    success: false,
    message: msg,
    time: Date.now(),
  };
  return res.status(400).json(response);
};

exports.badGateway = (msg, res) => {
  let response = {
    success: false,
    message: msg,
    time: Date.now(),
  };
  return res.status(502).json(response);
};

exports.serverError = (res) => {
  let response = {
    success: false,
    message: "Server Error! Please try again later",
    time: Date.now(),
  };
  return res.status(500).json(response);
};

exports.successWithMessage = (msg, res) => {
  let response = {
    success: true,
    message: msg,
    time: Date.now(),
  };
  return res.status(200).json(response);
};

exports.emailSent = (res) => {
  let response = {
    success: true,
    message: "Email Sent Successfully!",
    time: Date.now(),
  };
  return res.status(250).json(response);
};

exports.tooManyRequests = (res) => {
  let response = {
    success: false,
    message: "Too Many Requests! Please try again after 30 min.",
    time: Date.now(),
  };
  return res.status(429).json(response);
};
