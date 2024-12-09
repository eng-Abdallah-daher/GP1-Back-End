const SalesRequest = require("../models/salesRequestModel");

const create = async (req, res) => {
  try {
    const salesRequestData = req.body;
    const result = await SalesRequest.create(salesRequestData);
    res.status(201).json({ message: "Sales request created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error creating sales request", error });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await SalesRequest.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sales requests", error });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesRequest.getById(id);
    if (!result) {
      return res.status(404).json({ message: "Sales request not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sales request", error });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesRequest.delete(id);
    res.status(200).json({ message: "Sales request deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sales request", error });
  }
};

module.exports = { create, getAll, getById, deleteRequest };
