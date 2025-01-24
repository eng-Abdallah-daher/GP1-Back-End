const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const PostReport = {
  create: async (reportData) => {
    try {
      const db = client.db("gp1");
      const collection = db.collection('postReports');
      const result = await collection.insertOne(reportData);
      return result;
    } catch (err) {
      console.error("Error creating post report:", err);
    }
  },

  delete: async (id) => {
    try {
      const db = client.db("gp1");
      const collection = db.collection('postReports');
      const result = await collection.deleteOne({ id: Number(id) });
      return result;
    } catch (err) {
      console.error("Error deleting post report:", err);
    }
  },

  getAll: async () => {
    try {
      const db = client.db("gp1");
      const collection = db.collection('postReports');
      const reports = await collection.find().toArray(); 
      return reports;
    } catch (err) {
      console.error("Error retrieving post reports:", err);
    }
  }
};

module.exports = PostReport;
