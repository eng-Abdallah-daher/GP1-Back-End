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

module.exports = router;
