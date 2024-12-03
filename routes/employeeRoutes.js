const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getById);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;
