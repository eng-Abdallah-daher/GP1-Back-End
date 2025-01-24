const express = require('express');
const router = express.Router();
const PostReportController = require('../controllers/postReportController');
router.post('/', PostReportController.create);
router.delete('/:id', PostReportController.delete);
router.get('/', PostReportController.getAll);

module.exports = router;
