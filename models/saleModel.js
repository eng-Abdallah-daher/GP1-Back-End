const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Sale = {
    create: async (saleData) => {
        try {
            const db = client.db("gp1");
            const salesCollection = db.collection('Sale');
            const result = await salesCollection.insertOne(saleData);
            return result;
        } catch (err) {
            console.error("Error creating sale:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const salesCollection = db.collection('Sale');
            return await salesCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all sales:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const salesCollection = db.collection('Sale');
            return await salesCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving sale by ID:", err);
        }
    },
    update: async (id, saleData) => {
        try {
            const db = client.db("gp1");
            const salesCollection = db.collection('Sale');
            const result = await salesCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: saleData }
            );
            return result;
        } catch (err) {
            console.error("Error updating sale:", err);
        }
    },
    updateQuantity: async (id, quantity) => {
    try {
        const db = client.db("gp1");
        const salesCollection = db.collection('Sale');
        const result = await salesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { quantity: quantity } }
        );
        return result;
    } catch (err) {
        console.error("Error updating quantity:", err);
    }
},

    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const salesCollection = db.collection('Sale');
            const result = await salesCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting sale:", err);
        }
    },
    getByOwnerId: async (ownerId) => {
        try {
            const db = client.db("gp1");
            const salesCollection = db.collection('Sale');
            return await salesCollection.find({ ownerid: ownerId }).toArray();
        } catch (err) {
            console.error("Error retrieving sales by owner ID:", err);
        }
    }
};

module.exports = Sale;
