const express = require("express");
const router = express.Router();
const AvailableSchedulesController = require("../controllers/availableSchedulesController");

router.post("/", AvailableSchedulesController.createSchedule);
router.get("/", AvailableSchedulesController.getAllSchedules);
router.get("/:id", AvailableSchedulesController.getScheduleById);
router.put("/:id", AvailableSchedulesController.updateSchedule);
router.delete("/:id", AvailableSchedulesController.deleteSchedule);


module.exports = router;
