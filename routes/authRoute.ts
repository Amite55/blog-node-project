const router = require("express").Router();
const signValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");
const { isUnAuthenticated } = require("../controllers/authControllers");

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authControllers");

router.get("/signup", isUnAuthenticated, signupGetController);
router.post("/signup", isUnAuthenticated, signValidator, signupPostController);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router;
