
const express = require("express");
const router = express.Router();
const estimateController = require("../controllers/estimateController.js");

router.post("/estimate-repair-cost", (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  const cost = estimateController.estimateRepairCost(description);
  res.json({ cost });
});

module.exports = router;
