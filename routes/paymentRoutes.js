const express = require('express');
const {
    createPaymentRecord,
    getAllPaymentRecords,
    getUserPaymentHistory,
    updatePaymentStatus,
    deletePaymentRecords,
    hasPaid
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/', createPaymentRecord);
router.get('/', getAllPaymentRecords);
router.get('/:userId', getUserPaymentHistory);
router.put('/', updatePaymentStatus);
router.delete('/:id', deletePaymentRecords);
router.post('/has-paid', hasPaid);
module.exports = router;
