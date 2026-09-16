const router = require("express").Router();
const signValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authControllers");

router.get("/signup", signupGetController);
router.post("/signup", signValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router;
