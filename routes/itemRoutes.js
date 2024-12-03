const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

router.post('/', ItemController.create);
router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getById);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;
