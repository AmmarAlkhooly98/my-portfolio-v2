const express = require("express");
const router = express.Router();

const { postMail } = require("../controllers/mailer.controller");
const { validateMailer } = require("../validations/mailer.validation");
const { rateLimit } = require("../middlewares/mailer.middleware");

router.post("/", validateMailer, rateLimit, postMail);

module.exports = router;
