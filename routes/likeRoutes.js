const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.get('/', likeController.getAllLikes);
router.get('/:id', likeController.getLikeById);
router.post('/', likeController.addLike);
router.delete('/:id', likeController.deleteLike);

module.exports = router;
