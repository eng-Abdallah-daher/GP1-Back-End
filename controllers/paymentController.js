const PaymentRecord = require('../models/paymentModel');

const createPaymentRecord = async (req, res) => {
    const { userId, year, month, paid,id } = req.body;
    
    const result = await PaymentRecord.create({ userId, year, month, paid ,id});
    res.json(result);
};

const getAllPaymentRecords = async (req, res) => {
    const records = await PaymentRecord.getAll();
    res.json(records);
};

const getUserPaymentHistory = async (req, res) => {
    const { userId } = req.params;
    const records = await PaymentRecord.getByUserId(Number(userId));
    res.json(records);
};

const updatePaymentStatus = async (req, res) => {
    const { userId, year, month, paid } = req.body;
    
    const result = await PaymentRecord.updatePaymentStatus(
        Number(userId),
        Number(year),
        Number(month),
        paid
    );
    res.json(result);
};
 const hasPaid= async (req, res) => {
        const { userId, year, month } = req.body;

        if (!userId || !year || !month) {
            return res.status(400).json({ error: "Missing required fields: userId, year, or month" });
        }

        try {
            const record = await PaymentRecord.getByQuery(userId, year, month);
            const paid = record ? record.paid : false;
            return res.status(200).json({ paid });
        } catch (err) {
            console.error("Error in hasPaid controller:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
const deletePaymentRecords = async (req, res) => {
    const {id} = req.params;
    const result = await PaymentRecord.deleteById(id);

    res.json(result);
};

module.exports = {
    createPaymentRecord,
    getAllPaymentRecords,
    getUserPaymentHistory,
    updatePaymentStatus,
    deletePaymentRecords,
    hasPaid
};
