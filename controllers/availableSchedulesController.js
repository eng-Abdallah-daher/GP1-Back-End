const AvailableSchedules = require("../models/availableSchedulesModel");

const AvailableSchedulesController = {
  createSchedule: async (req, res) => {
    try {
      const scheduleData = req.body;
      const result = await AvailableSchedules.create(scheduleData);
      res.status(201).json({ message: "Schedule created successfully", result });
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(500).json({ message: "Error creating schedule", error });
    }
  },

  getAllSchedules: async (req, res) => {
    try {
      const schedules = await AvailableSchedules.getAll();
      res.status(200).json(schedules);
    } catch (error) {
      console.error("Error retrieving schedules:", error);
      res.status(500).json({ message: "Error retrieving schedules", error });
    }
  },

  getScheduleById: async (req, res) => {
    try {
      const id = req.params.id;
      const schedule = await AvailableSchedules.getById(id);
      if (schedule) {
        res.status(200).json(schedule);
      } else {
        res.status(404).json({ message: "Schedule not found" });
      }
    } catch (error) {
      console.error("Error retrieving schedule by ID:", error);
      res.status(500).json({ message: "Error retrieving schedule by ID", error });
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const id = req.params.id;
      const scheduleData = req.body;
      const result = await AvailableSchedules.update(id, scheduleData);
      res.status(200).json({ message: "Schedule updated successfully", result });
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).json({ message: "Error updating schedule", error });
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await AvailableSchedules.delete(id);
      res.status(200).json({ message: "Schedule deleted successfully", result });
    } catch (error) {
      console.error("Error deleting schedule:", error);
      res.status(500).json({ message: "Error deleting schedule", error });
    }
  }
};

module.exports = AvailableSchedulesController;
