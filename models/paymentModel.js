const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const PaymentRecord = {
    create: async (recordData) => {
        const db = client.db("gp1");
        const collection = db.collection('PaymentRecord');
        return await collection.insertOne(recordData);
    },
    getAll: async () => {
        const db = client.db("gp1");
        const collection = db.collection('PaymentRecord');
        return await collection.find().toArray();
    },
    getByUserId: async (userId) => {
        const db = client.db("gp1");
        const collection = db.collection('PaymentRecord');
        return await collection.find({ userId }).toArray();
    },
     getByQuery: async (userId, year, month) => {
        try {
            const db = client.db("gp1");
            const collection = db.collection("PaymentRecord");
            const record = await collection.findOne({
                userId: Number(userId),
                year: Number(year),
                month: Number(month)
            });
            return record;
        } catch (err) {
            console.error("Error fetching payment record:", err);
            return null;
        }
    },
    updatePaymentStatus: async (userId, year, month, paid) => {
        
        const db = client.db("gp1");
        const collection = db.collection('PaymentRecord');
        return await collection.updateOne(
            { userId, year, month },
            { $set: { paid } },
            { upsert: true }
        );
    },
    deleteById: async (Id) => {
        
        const db = client.db("gp1");
        const collection = db.collection('PaymentRecord');
        return await collection.deleteOne({ id:Number(Id) });
    }
};

module.exports = PaymentRecord;
