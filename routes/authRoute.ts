const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../model/User");

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authControllers");

const signupValidator = [
  body("userName")
    .isLength({ min: 2 })
    .withMessage("User name must be at least 2 characters long")
    .custom(async (value: any) => {
      const existingUser = await User.findOne({ userName: value });
      if (existingUser) {
        return Promise.reject("User name already exists");
      }
    })
    .trim(),
  body("phone")
    .isMobilePhone("en-IN")
    .withMessage("Please provide a valid phone number")
    .custom(async (value: any) => {
      const existingUser = await User.findOne({ phone: value });
      if (existingUser) {
        return Promise.reject("Phone number already exists");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .custom(async (value: any) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        return Promise.reject("Email already exists");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom((value: any, { req }: any) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginPostController);

router.get("/logout", logoutController);

module.exports = router;
