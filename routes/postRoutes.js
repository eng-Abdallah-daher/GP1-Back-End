const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.post('/', PostController.create);
router.get('/', PostController.getAll);
router.get('/:id', PostController.getById);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);
router.post('/:id/like', PostController.addLike);  
router.post('/:id/comment', PostController.addComment); 
router.delete('/likes/:id/:id2', PostController.removelike); 
router.delete('/:id/comments/:commentId', PostController.removeComment);
router.put('/:postId/comments/:commentId', PostController.updateComment);
router.post('/:postId/comments/:commentId/replies', PostController.addReply);
router.put('/:postId/comments/:commentId/replies/:replyId',PostController.updateReply);
router.delete('/:postId/comments/:commentId/replies/:replyId',PostController.deletereply);
module.exports = router;
