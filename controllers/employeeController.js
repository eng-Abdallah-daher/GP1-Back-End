const Employee = require('../models/employeeModel');

const EmployeeController = {
    create: async (req, res) => {
        try {
            const employeeData = req.body;
            const result = await Employee.create(employeeData);
            res.status(201).json({ message: 'Employee created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating employee', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const employees = await Employee.getAll();
            res.status(200).json({ message: 'Employees retrieved successfully', data: employees });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving employees', error });
        }
    },
    getById: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const employee = await Employee.getById(employeeId);
            if (employee) {
                res.status(200).json({ message: 'Employee retrieved successfully', data: employee });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving employee', error });
        }
    },
    update: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const employeeData = req.body;
            const result = await Employee.update(employeeId, employeeData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Employee updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating employee', error });
        }
    },
    delete: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const result = await Employee.delete(employeeId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Employee deleted successfully' });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting employee', error });
        }
    },

    addTask: async (req, res) => {
    try {
      const { employeeId,date,time,task,taskId,ownerId } = req.body;
// console.log(date,time,task,taskId,ownerId);
      const result = await Employee.addTask(employeeId, date, time, task,taskId, ownerId);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Task added successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error adding task", error });
    }
  },

  removeTask: async (req, res) => {
    try {
      const { employeeId, taskId } = req.body;
      const result = await Employee.removeTask(employeeId, taskId);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Task removed successfully" });
      } else {
        res.status(404).json({ message: "Task not found or employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error removing task", error });
    }
  }
};

module.exports = EmployeeController;
