const { MongoClient, ObjectId } = require('mongodb');
const { isValidObjectId } = require('mongoose');

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
            return await usersCollection.find().toArray();
        } catch (err) {
            return err;
            
        }
    },
    addRate: async (id, rate) => {
    try {
        
        const db = client.db("gp1");
        const usersCollection = db.collection('User');
        const result = await usersCollection.updateOne(
            { id: Number(id) },
            { $set: { rate: rate } }
        );
        return result;
    } catch (err) {
        console.error(err);
    }
},
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            return await usersCollection.findOne({ id:Number(id) });
        } catch (err) {
            console.error(err);
        }
    },
    update: async (id, userData) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            
            
            const result = await usersCollection.updateOne({ email: id }, { $set: { name: userData.name,phone:userData.phone } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    updatePassword: async (id, newPassword) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            const result = await usersCollection.updateOne({ email: id }, { $set: { password: newPassword } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    updatestatus: async (id, newstatus) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
       

            const result = await usersCollection.updateOne({ email: id }, { $set: { isServiceActive: newstatus } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    updateprofileimage: async (id, newimage) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');


            const result = await usersCollection.updateOne({ email: id }, { $set: { profileImage: newimage } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    updateaccountnumber: async (id, newaccountnumber) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');


            const result = await usersCollection.updateOne({ email: id }, { $set: { accountnumber: newaccountnumber } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    updateonlinestatus: async (email, newstatus) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
       

            const result = await usersCollection.updateOne({ email: email}, { $set: { online: newstatus } });
            return result;
        } catch (err) {
            console.error(err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const usersCollection = db.collection('User');
            const result = await usersCollection.deleteOne({ email: id });
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
    },
    removeRate : async (id, rate) => {
    try {
        const db = client.db("gp1");
        const usersCollection = db.collection("User");
        const result = await usersCollection.updateOne(
            { id: Number(id) },
            { $pull: { rates: rate } }
        );
        return result;
    } catch (err) {
        console.error(err);
    }
}
};

module.exports = User;
