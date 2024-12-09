const express = require('express');
const router = express.Router();
const DeliveryRequestController = require('../controllers/deliveryRequestController');

router.post('/', DeliveryRequestController.create);
router.get('/', DeliveryRequestController.getAll);
router.get('/:id', DeliveryRequestController.getById);
router.put('/:id', DeliveryRequestController.update);
router.put('/status/:id', DeliveryRequestController.updatestatus);
router.delete('/:id', DeliveryRequestController.delete);

module.exports = router;
