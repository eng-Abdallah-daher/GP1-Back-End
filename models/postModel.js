const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Post = {
    create: async (postData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.insertOne(postData);
            return result;
        } catch (err) {
            console.error("Error creating post:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            return await postsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all posts:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            return await postsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving post by ID:", err);
        }
    },
    update: async (id, postData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: postData }
            );
            return result;
        } catch (err) {
            console.error("Error updating post:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    },
    addLike: async (id, userId) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $addToSet: { likes: userId } }
            );
            return result;
        } catch (err) {
            console.error("Error adding like:", err);
        }
    },
    addComment: async (id, commentData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $push: { comments: commentData } }
            );
            return result;
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    },
    addReplyToComment: async (postId, commentId, replyData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { _id: new ObjectId(postId), "comments.commentId": commentId },
                { $push: { "comments.$.replies": replyData } }
            );
            return result;
        } catch (err) {
            console.error("Error adding reply to comment:", err);
        }
    },
    updateComment: async (postId, commentId, updatedCommentData) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { _id: new ObjectId(postId), "comments.commentId": commentId },
                { $set: { "comments.$.text": updatedCommentData.text } }
            );
            return result;
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    },
    deleteComment: async (postId, commentId) => {
        try {
            const db = client.db("gp1");
            const postsCollection = db.collection('Post');
            const result = await postsCollection.updateOne(
                { _id: new ObjectId(postId) },
                { $pull: { comments: { commentId: commentId } } }
            );
            return result;
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    }
};

module.exports = Post;
