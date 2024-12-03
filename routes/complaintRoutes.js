const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/', complaintController.getAll);
router.get('/:id', complaintController.getById);
router.post('/', complaintController.create);
router.put('/:id', complaintController.update);
router.delete('/:id', complaintController.delete);

module.exports = router;
