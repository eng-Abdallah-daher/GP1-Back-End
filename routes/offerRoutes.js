const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/offerController');

router.post('/', OfferController.create);
router.get('/', OfferController.getAll);
router.get('/:id', OfferController.getById);
router.put('/:id', OfferController.update);
router.delete('/:id', OfferController.delete);

module.exports = router;
