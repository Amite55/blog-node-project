const router = require("express").Router();
const { isUnAuthenticated } = require("../controllers/authControllers");
const {
  uploadProfileImageController,
} = require("../controllers/uploadController");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/profile-image",
  isUnAuthenticated,
  upload.single("profile-image"),
  uploadProfileImageController,
);

module.exports = router;
