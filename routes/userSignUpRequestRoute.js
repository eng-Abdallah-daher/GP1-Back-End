const express = require('express');
const router = express.Router();
const UserSignUpRequestController = require('../controllers/userSignUpRequestController');

router.post('/add-multiple', UserSignUpRequestController.createUserSignUpRequests);
router.get('/all', UserSignUpRequestController.getAllUserSignUpRequests);
router.delete('/:id', UserSignUpRequestController.deleteUserSignUpRequest);

module.exports = router;