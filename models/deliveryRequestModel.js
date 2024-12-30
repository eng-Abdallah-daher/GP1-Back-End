const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const DeliveryRequest = {
    create: async (deliveryRequestData) => {
        try {
            const db = client.db("gp1");
            const deliveryRequestsCollection = db.collection('deliveryRequests');
            const result = await deliveryRequestsCollection.insertOne(deliveryRequestData);
            return result;
        } catch (err) {
            console.error("Error creating delivery request:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const deliveryRequestsCollection = db.collection('deliveryRequests');
            return await deliveryRequestsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all delivery requests:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const deliveryRequestsCollection = db.collection('deliveryRequests');
            return await deliveryRequestsCollection.findOne({ id:Number(id) });
        } catch (err) {
            console.error("Error retrieving delivery request by ID:", err);
        }
    },
    update: async (id, deliveryRequestData) => {
        try {
            const db = client.db("gp1");
            const deliveryRequestsCollection = db.collection('deliveryRequests');
            const result = await deliveryRequestsCollection.updateOne(
                { id:Number(id)  },
                {$set: { phone: deliveryRequestData.phone,
                    address:deliveryRequestData.address,
                    instructions:deliveryRequestData.phone,
                 }  }
            );
            return result;
        } catch (err) {
            console.error("Error updating delivery request:", err);
        }
    },
     updatestatus: async (id, deliveryRequestData) => {
        try {
            const db = client.db("gp1");
            const deliveryRequestsCollection = db.collection('deliveryRequests');
            const result = await deliveryRequestsCollection.updateOne(
                { id:Number(id) },
                { $set: { status: deliveryRequestData.status } }
            );
            return result;
        } catch (err) {
            console.error("Error updating delivery request:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const deliveryRequestsCollection = db.collection('deliveryRequests');
            const result = await deliveryRequestsCollection.deleteOne({ id:Number(id)  });
            return result;
        } catch (err) {
            console.error("Error deleting delivery request:", err);
        }
    }
};

module.exports = DeliveryRequest;
