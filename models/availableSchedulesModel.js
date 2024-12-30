const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const AvailableSchedules = {
    create: async (scheduleData) => {
        try {
            const db = client.db("gp1");
            const schedulesCollection = db.collection('availableSchedules');
            const result = await schedulesCollection.insertOne(scheduleData);
            return result;
        } catch (err) {
            console.error("Error creating schedule:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const schedulesCollection = db.collection('availableSchedules');
          
            return await schedulesCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving schedules:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const schedulesCollection = db.collection('availableSchedules');
            return await schedulesCollection.findOne({ taskId: id });
        } catch (err) {
            console.error("Error retrieving schedule by ID:", err);
        }
    },
    update: async (id, scheduleData) => {
        try {
            const db = client.db("gp1");
            const schedulesCollection = db.collection('availableSchedules');
            const result = await schedulesCollection.updateOne(
                { taskId: id },
                { $set: scheduleData }
            );
            return result;
        } catch (err) {
            console.error("Error updating schedule:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const schedulesCollection = db.collection('availableSchedules');
            const result = await schedulesCollection.deleteOne({ taskId: id });
            return result;
        } catch (err) {
            console.error("Error deleting schedule:", err);
        }
    }
};

module.exports = AvailableSchedules;
