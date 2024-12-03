const express = require('express');
const offerController = require('../controllers/offerController');

const router = express.Router();

router.get('/', offerController.getAll);
router.get('/:id', offerController.getById);
router.post('/', offerController.create);
router.put('/:id', offerController.update);
router.delete('/:id', offerController.delete);

module.exports = router;
