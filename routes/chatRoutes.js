const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.createChat);
router.get('/', chatController.getAllChats);
router.get('/:id', chatController.getChatById);
router.put('/:id', chatController.updateChat);
router.put('/add-message', chatController.addMessageToChat);
router.put('/remove-message', chatController.removeMessageFromChat);
router.delete('/:id', chatController.deleteChat);

module.exports = router;
