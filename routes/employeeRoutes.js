const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);
router.post('/add-task', EmployeeController.addTask);
router.delete('/remove-task/:id', EmployeeController.removeTask);
module.exports = router;
