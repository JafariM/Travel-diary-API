const express = require("express");
const router = express.Router();
const {
  getAllTravels,
  getTravel,
  createTravel,
  updateTravel,
  deleteTravel,
} = require("../controllers/travel-diary");

router.route("/").post(createTravel).get(getAllTravels);
router.route("/:id").get(getTravel).patch(updateTravel).delete(deleteTravel);

module.exports = router;
