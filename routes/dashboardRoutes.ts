const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const {
  getDashboardController,
  createProfileGetProfileController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController,
} = require("../controllers/dashboardController");

router.get("/", isAuthenticated, getDashboardController);
router.get(
  "/create-profile",
  isAuthenticated,
  createProfileGetProfileController,
);
router.post("/create-profile", isAuthenticated, createProfilePostController);
router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post("/edit-profile", isAuthenticated, editProfilePostController);

module.exports = router;
