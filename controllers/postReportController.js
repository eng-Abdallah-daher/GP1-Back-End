const PostReport = require('../models/postReportModel');


const PostReportController = {
  create: async (req, res) => {
    try {
      const reportData = req.body;
      const result = await PostReport.create(reportData);
      res.status(201).json({ message: "Post report created successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: "Error creating post report", error });
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await PostReport.getAll(); 
      res.status(200).json({ message: "Post reports retrieved successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving post reports", error });
    }
  },

delete: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await PostReport.delete(id);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Post report deleted successfully" });
      } else {
        res.status(404).json({ message: "Post report not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting post report", error });
    }
  }
};

module.exports = PostReportController;
