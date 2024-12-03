const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Offer = {
    create: async (offerData) => {
        try {
            const db = client.db("gp1");
            const offersCollection = db.collection('Offer');
            const result = await offersCollection.insertOne(offerData);
            return result;
        } catch (err) {
            console.error("Error creating offer:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const offersCollection = db.collection('Offer');
            return await offersCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all offers:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const offersCollection = db.collection('Offer');
            return await offersCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving offer by ID:", err);
        }
    },
    update: async (id, offerData) => {
        try {
            const db = client.db("gp1");
            const offersCollection = db.collection('Offer');
            const result = await offersCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: offerData }
            );
            return result;
        } catch (err) {
            console.error("Error updating offer:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const offersCollection = db.collection('Offer');
            const result = await offersCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting offer:", err);
        }
    }
};

module.exports = Offer;
