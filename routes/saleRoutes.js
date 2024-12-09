const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/saleController');

router.post('/', SaleController.create);
router.get('/', SaleController.getAll);
router.get('/:id', SaleController.getById);
router.put('/:id', SaleController.update);
router.delete('/:id', SaleController.delete);
router.get('/owner/:ownerId', SaleController.getByOwnerId);
router.patch('/:id/updateQuantity', SaleController.updateItemQuantity);
module.exports = router;
