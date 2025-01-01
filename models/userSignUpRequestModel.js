const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const UserSignUpRequest = {
  createMany : async (userRequests) => {
    
  try {
    if (!userRequests || typeof userRequests !== 'object') {
      throw new Error("Invalid input: userRequests must be a valid object.");
    }

    const db = client.db("gp1");
    const userRequestsCollection = db.collection("UserSignUpRequests");

    

    const result = await userRequestsCollection.insertOne(userRequests);

  
    return result;
  } catch (err) {
    console.error("Error creating user sign-up request:", err.message);
    throw err; 
  }
},
  getAll: async () => {
    try {
      const db = client.db("gp1");
      const userRequestsCollection = db.collection('UserSignUpRequests');
      return await userRequestsCollection.find().toArray();
    } catch (err) {
      console.error("Error retrieving user sign-up requests:", err);
    }
  },
  delete: async (id) => {
    try {
      const db = client.db("gp1");
      const userRequestsCollection = db.collection('UserSignUpRequests');
      const result = await userRequestsCollection.deleteOne({ id: Number(id) });
      return result;
    } catch (err) {
      console.error("Error deleting user sign-up request:", err);
    }
  }
};

module.exports = UserSignUpRequest;
