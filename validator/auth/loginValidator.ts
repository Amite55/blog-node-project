const { body } = require("express-validator");

const loginValidator = [
  body("email").not().isEmpty().withMessage("Email is required").isEmail(),
  body("password").not().isEmpty().withMessage("Password is required"),
];

module.exports = loginValidator;
