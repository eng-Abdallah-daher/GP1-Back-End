const { MongoClient, ObjectId } = require('mongodb');


const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Complaint = {
    create: async (complaintData) => {
        try {
            const db = client.db("gp1");
            const complaintsCollection = db.collection('complaints');
            const result = await complaintsCollection.insertOne(complaintData);
            return result;
        } catch (err) {
            console.error("Error creating complaint:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const complaintsCollection = db.collection('complaints');
            return await complaintsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all complaints:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const complaintsCollection = db.collection('complaints');
            return await complaintsCollection.findOne({ id:Number(id) });
        } catch (err) {
            console.error("Error retrieving complaint by ID:", err);
        }
    },
    update: async (id, complaintData) => {
        try {
            const db = client.db("gp1");
            const complaintsCollection = db.collection('complaints');
            const result = await complaintsCollection.updateOne(
                { id:Number(id) },
                { $set: complaintData }
            );
            return result;
        } catch (err) {
            console.error("Error updating complaint:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const complaintsCollection = db.collection('complaints');
            const result = await complaintsCollection.deleteOne({ id:Number(id) });
            return result;
        } catch (err) {
            console.error("Error deleting complaint:", err);
        }
    }
};

module.exports = Complaint;
