const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const User = {
    create: async (userData) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            const result = await usersCollection.insertOne(userData);
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
            return await usersCollection.find().toArray();
        } catch (err) {
            return err;
            
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            return await usersCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error(err);
        }
    },
    update: async (id, userData) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            const updateData = {
                username: userData.username,
                phone: userData.phone
            };
            const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    updatePassword: async (id, newPassword) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { password: newPassword } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    getByEmail: async (email) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            return await usersCollection.findOne({ email: email });
        } catch (err) {
            console.error(err);
        }
    },
    authenticate: async (email, password) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            return await usersCollection.findOne({ email: email, password: password });
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = User;
