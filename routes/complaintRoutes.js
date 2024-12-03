const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/complaintController');

router.post('/', ComplaintController.create);
router.get('/', ComplaintController.getAll);
router.get('/:id', ComplaintController.getById);
router.put('/:id', ComplaintController.update);
router.delete('/:id', ComplaintController.delete);

module.exports = router;
