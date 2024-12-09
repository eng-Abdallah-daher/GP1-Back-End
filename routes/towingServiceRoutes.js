const express = require('express');
const router = express.Router();
const TowingServiceController = require('../controllers/towingServiceController');

router.post('/', TowingServiceController.create);
router.get('/', TowingServiceController.getAll);
router.get('/:id', TowingServiceController.getById);
router.put('/:id', TowingServiceController.update);
router.delete('/:id', TowingServiceController.delete);

module.exports = router;
