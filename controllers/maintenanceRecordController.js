const MaintenanceRecord = require("../models/maintenanceRecord");

const addMaintenanceRecord = async (req, res) => {
  const { id, userid, date, description } = req.body;

  try {
    const recordData = {
      id: id,
      userid: userid,
      date: new Date(date),
      description: description,
    };

    const result = await MaintenanceRecord.create(recordData);
    res
      .status(201)
      .json({ message: "Maintenance record added successfully", data: result });
  } catch (err) {
    console.error("Error adding maintenance record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllMaintenanceRecords = async (req, res) => {
  try {
    const records = await MaintenanceRecord.getAll();
    res.status(200).json(records);
  } catch (err) {
    console.error("Error retrieving maintenance records:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMaintenanceRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await MaintenanceRecord.getById(id);

    if (!record) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res.status(200).json(record);
  } catch (err) {
    console.error("Error retrieving maintenance record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMaintenanceRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await MaintenanceRecord.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res
      .status(200)
      .json({ message: "Maintenance record deleted successfully" });
  } catch (err) {
    console.error("Error deleting maintenance record:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addMaintenanceRecord,
  getAllMaintenanceRecords,
  getMaintenanceRecordById,
  deleteMaintenanceRecord,
};
