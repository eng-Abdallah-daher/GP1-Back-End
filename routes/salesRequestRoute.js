const express = require("express");
const router = express.Router();
const SalesRequestController = require("../controllers/salesRequestController");

router.post("/", SalesRequestController.create);
router.get("/", SalesRequestController.getAll);
router.get("/:id", SalesRequestController.getById);
router.delete("/:id", SalesRequestController.deleteRequest);

module.exports = router;
