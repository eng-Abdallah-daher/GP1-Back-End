const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Item = {
    create: async (itemData) => {
        try {
            const db = client.db("gp1");
            const itemsCollection = db.collection('items');
            const result = await itemsCollection.insertOne(itemData);
            return result;
        } catch (err) {
            console.error("Error creating item:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const itemsCollection = db.collection('items');
            return await itemsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all items:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const itemsCollection = db.collection('items');
            return await itemsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving item by ID:", err);
        }
    },
    update: async (id, itemData) => {
        try {
            const db = client.db("gp1");
            const itemsCollection = db.collection('items');
            const result = await itemsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: itemData }
            );
            return result;
        } catch (err) {
            console.error("Error updating item:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const itemsCollection = db.collection('items');
            const result = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    }
};

module.exports = Item;
