const express = require('express');
const router = express.Router();
const deliveryRequestController = require('../controllers/deliveryRequestController');

router.post('/', deliveryRequestController.createDeliveryRequest);
router.get('/', deliveryRequestController.getAllDeliveryRequests);
router.get('/:id', deliveryRequestController.getDeliveryRequestById);
router.put('/:id', deliveryRequestController.updateDeliveryRequest);
router.delete('/:id', deliveryRequestController.deleteDeliveryRequest);

module.exports = router;
