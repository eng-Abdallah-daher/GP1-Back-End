const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Payment = {
    create: async (paymentData) => {
        try {
            const db = client.db("gp1");
            const paymentsCollection = db.collection('payments');
            const result = await paymentsCollection.insertOne(paymentData);
            return result;
        } catch (err) {
            console.error("Error creating payment:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const paymentsCollection = db.collection('payments');
            return await paymentsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all payments:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const paymentsCollection = db.collection('payments');
            return await paymentsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving payment by ID:", err);
        }
    },
    update: async (id, paymentData) => {
        try {
            const db = client.db("gp1");
            const paymentsCollection = db.collection('payments');
            const result = await paymentsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: paymentData }
            );
            return result;
        } catch (err) {
            console.error("Error updating payment:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const paymentsCollection = db.collection('payments');
            const result = await paymentsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting payment:", err);
        }
    }
};

module.exports = Payment;
