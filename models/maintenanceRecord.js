const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const MaintenanceRecord = {
    create: async (recordData) => {
        try {
            const db = client.db("gp1");
            const maintenanceRecordsCollection = db.collection('MaintenanceRecord');
            const result = await maintenanceRecordsCollection.insertOne(recordData);
            return result;
        } catch (err) {
            console.error("Error creating maintenance record:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const maintenanceRecordsCollection = db.collection('MaintenanceRecord');
            return await maintenanceRecordsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving maintenance records:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const maintenanceRecordsCollection = db.collection('MaintenanceRecord');
            return await maintenanceRecordsCollection.findOne({ id: Number(id)});
        } catch (err) {
            console.error("Error retrieving maintenance record by ID:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const maintenanceRecordsCollection = db.collection('MaintenanceRecord');
            const result = await maintenanceRecordsCollection.deleteOne({id: Number(id) });
            return result;
        } catch (err) {
            console.error("Error deleting maintenance record:", err);
        }
    }
};

module.exports = MaintenanceRecord;
