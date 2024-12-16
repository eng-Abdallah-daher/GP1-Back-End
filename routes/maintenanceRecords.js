const express = require("express");
const router = express.Router();
const mr=require("../controllers/maintenanceRecordController");

router.post("/", mr.addMaintenanceRecord);

router.get("/", mr.getAllMaintenanceRecords);

router.get("/:id", mr.getMaintenanceRecordById);

router.delete("/:id", mr.deleteMaintenanceRecord);

module.exports = router;
