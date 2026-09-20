const router = require("express").Router();
const {
  getDashboardController,
} = require("../controllers/dashboardController");

router.get("/", getDashboardController);

module.exports = router;
