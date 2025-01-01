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
            
            return await cartsCollection.findOne({ cartId: Number(id)});
        } catch (err) {
            console.error("Error retrieving cart by ID:", err);
        }
    },
    update: async (id, cartData) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.updateOne(
                {  cartId: Number(id) },
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
            const result = await cartsCollection.deleteOne({ cartId: Number(id) });
            return result;
        } catch (err) {
            console.error("Error deleting cart:", err);
        }
    },
    addItem: async (id, itemData) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.updateOne(
                {  cartId: Number(id) },
                { $push: { items: itemData } }
            );
            return result;
        } catch (err) {
            console.error("Error adding item to cart:", err);
        }
    },
    removeItem: async (id, itemId) => {
        try {
            const db = client.db("gp1");
            const cartsCollection = db.collection('carts');
            const result = await cartsCollection.updateOne(
                {  cartId: Number(id) },
                { $pull: { items: { id: itemId } } }
            );
            
            return result;
        } catch (err) {
            console.error("Error removing item from cart:", err);
        }
    },
     updateItemQuantity :async (cartId, itemId, quantityChange) => {
  try {
    const db = client.db("gp1");
    const cartsCollection = db.collection("carts");

    const result = await cartsCollection.updateOne(
      { cartId: Number(cartId), "items.id": itemId },
      {
        $set: { "items.$.availableQuantity": quantityChange }
      }
    );

    return result;
  } catch (err) {
    console.error("Error updating item quantity in cart:", err);
    throw err;
  }
}
};

module.exports = Cart;
