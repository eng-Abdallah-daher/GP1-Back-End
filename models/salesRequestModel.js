const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const SalesRequest = {
  create: async (salesRequestData) => {
    try {
      const db = client.db("gp1");
      const salesRequestsCollection = db.collection("salesRequests");
      const result = await salesRequestsCollection.insertOne(salesRequestData);
      return result;
    } catch (err) {
      console.error("Error creating sales request:", err);
    }
  },
  getAll: async () => {
    try {
      const db = client.db("gp1");
      const salesRequestsCollection = db.collection("salesRequests");
      return await salesRequestsCollection.find().toArray();
    } catch (err) {
      console.error("Error retrieving sales requests:", err);
    }
  },
  getById: async (id) => {
    try {
      const db = client.db("gp1");
      const salesRequestsCollection = db.collection("salesRequests");
      return await salesRequestsCollection.findOne({id: Number(id) });
    } catch (err) {
      console.error("Error retrieving sales request by ID:", err);
    }
  },
  delete: async (id) => {
    try {
      const db = client.db("gp1");
      const salesRequestsCollection = db.collection("salesRequests");
      const result = await salesRequestsCollection.deleteOne({ id: Number(id) });
      return result;
    } catch (err) {
      console.error("Error deleting sales request:", err);
    }
  },
};

module.exports = SalesRequest;
