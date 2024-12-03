const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Comment = {
    create: async (commentData) => {
        try {
            const db = client.db("gp1");
            const commentsCollection = db.collection('comments');
            const result = await commentsCollection.insertOne(commentData);
            return result;
        } catch (err) {
            console.error("Error creating comment:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const commentsCollection = db.collection('comments');
            return await commentsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all comments:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const commentsCollection = db.collection('comments');
            return await commentsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving comment by ID:", err);
        }
    },
    update: async (commentId, updatedData) => {
        try {
            const db = client.db("gp1");
            const commentsCollection = db.collection('comments');
            const result = await commentsCollection.updateOne(
                { _id: new ObjectId(commentId) },
                { $set: updatedData }
            );
            return result;
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    },
    addReply: async (commentId, replyData) => {
        try {
            const db = client.db("gp1");
            const commentsCollection = db.collection('comments');
            const result = await commentsCollection.updateOne(
                { _id: new ObjectId(commentId) },
                { $push: { replies: replyData } }
            );
            return result;
        } catch (err) {
            console.error("Error adding reply to comment:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const commentsCollection = db.collection('comments');
            const result = await commentsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    }
};

module.exports = Comment;
