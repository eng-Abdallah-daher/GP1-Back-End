const express = require("express");
const router = express.Router();
const {
  addMaintenanceRecord,
  getAllMaintenanceRecords,
  getMaintenanceRecordById,
  deleteMaintenanceRecord,
} = require("../controllers/maintenanceRecordController");

router.post("/", addMaintenanceRecord);

router.get("/", getAllMaintenanceRecords);

router.get("/:id", getMaintenanceRecordById);

router.delete("/:id", deleteMaintenanceRecord);

module.exports = router;
