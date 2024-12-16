const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const MaintenanceRequest = {
    create: async (requestData) => {
        try {
            const db = client.db("gp1");
            const maintenanceRequestsCollection = db.collection('MaintenanceRequest');
            const result = await maintenanceRequestsCollection.insertOne(requestData);
            return result;
        } catch (err) {
            console.error("Error creating maintenance request:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const maintenanceRequestsCollection = db.collection('MaintenanceRequest');
            return await maintenanceRequestsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all maintenance requests:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const maintenanceRequestsCollection = db.collection('MaintenanceRequest');
            return await maintenanceRequestsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving maintenance request by ID:", err);
        }
    },
    update: async (id, requestData) => {
        try {
            const db = client.db("gp1");
            const maintenanceRequestsCollection = db.collection('MaintenanceRequest');
            const result = await maintenanceRequestsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: requestData }
            );
            return result;
        } catch (err) {
            console.error("Error updating maintenance request:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const maintenanceRequestsCollection = db.collection('MaintenanceRequest');
            const result = await maintenanceRequestsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting maintenance request:", err);
        }
    }
};

module.exports = MaintenanceRequest;
