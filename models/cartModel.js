const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Cart = {
    create: async (cartData) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.insertOne(cartData);
            return result;
        } catch (err) {
            console.error("Error creating cart:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            return await cartsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving carts:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            return await cartsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving cart by ID:", err);
        }
    },
    update: async (id, cartData) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: cartData }
            );
            return result;
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting cart:", err);
        }
    },
    addItem: async (cartId, itemData) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.updateOne(
                { _id: new ObjectId(cartId) },
                { $push: { items: itemData } }
            );
            return result;
        } catch (err) {
            console.error("Error adding item to cart:", err);
        }
    },
    removeItem: async (cartId, itemId) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.updateOne(
                { _id: new ObjectId(cartId) },
                { $pull: { items: { id: itemId } } }
            );
            return result;
        } catch (err) {
            console.error("Error removing item from cart:", err);
        }
    }
};

module.exports = Cart;
