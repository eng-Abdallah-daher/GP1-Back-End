const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const TowingService = {
    create: async (towingServiceData) => {
        try {
            const db = client.db("gp1");
            const towingServicesCollection = db.collection('towingServices');
            const result = await towingServicesCollection.insertOne(towingServiceData);
            return result;
        } catch (err) {
            console.error("Error creating towing service:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const towingServicesCollection = db.collection('towingServices');
            return await towingServicesCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving towing services:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const towingServicesCollection = db.collection('towingServices');
            return await towingServicesCollection.findOne({id:Number(id) });
        } catch (err) {
            console.error("Error retrieving towing service by ID:", err);
        }
    },
    update: async (id, towingServiceData) => {
        try {
            const db = client.db("gp1");
            const towingServicesCollection = db.collection('towingServices');
            const result = await towingServicesCollection.updateOne(
                { id:Number(id) },
                { $set: towingServiceData }
            );
            return result;
        } catch (err) {
            console.error("Error updating towing service:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const towingServicesCollection = db.collection('towingServices');
            const result = await towingServicesCollection.deleteOne({ id:Number(id) });
            return result;
        } catch (err) {
            console.error("Error deleting towing service:", err);
        }
    }
};

module.exports = TowingService;
