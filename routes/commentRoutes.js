const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.post('/', CommentController.create);
router.get('/', CommentController.getAll);
router.get('/:id', CommentController.getById);
router.put('/:id', CommentController.update);  // Update comment
router.post('/:id/reply', CommentController.addReply);  // Add reply to comment
router.delete('/:id', CommentController.delete);

module.exports = router;
