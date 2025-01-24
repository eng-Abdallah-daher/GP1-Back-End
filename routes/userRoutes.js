const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.put('/:id/password', UserController.updatePassword); 
router.put('/:id/activestatus', UserController.updateactivestatus); 
router.put('/:id/profileimage', UserController.updateprofileimage); 
router.put('/:email/onlinestatus', UserController.updateonlinestatus); 
router.delete('/:id', UserController.delete);
router.get('/email/:email', UserController.getByEmail);
router.post('/authenticate', UserController.authenticate);
router.post('/newrate/:id', UserController.addRateToUser);


module.exports = router;
