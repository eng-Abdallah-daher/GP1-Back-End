const express = require('express');
const router = express.Router();
const UserSignUpRequestController = require('../controllers/userSignUpRequestController');

router.post('/', UserSignUpRequestController.createUserSignUpRequests);
router.get('/', UserSignUpRequestController.getAllUserSignUpRequests);
router.delete('/:id', UserSignUpRequestController.deleteUserSignUpRequest);

module.exports = router;
