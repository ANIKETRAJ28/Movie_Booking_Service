const express = require("express");
const router = express.Router();
const { create, destroy, get, getAll } = require("../../controllers/booking-controllers");

router.post("/bookings", create);
router.get("/bookings/:id", get);
router.get("/bookings", getAll);
router.delete("/bookings/:id", destroy);

module.exports = router;