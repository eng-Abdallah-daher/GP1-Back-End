const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Chat = {
    create: async (chatData) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            const result = await chatsCollection.insertOne(chatData);
            return result;
        } catch (err) {
            console.error("Error creating chat:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            return await chatsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving chats:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            return await chatsCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving chat by ID:", err);
        }
    },
    update: async (id, chatData) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            const result = await chatsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: chatData }
            );
            return result;
        } catch (err) {
            console.error("Error updating chat:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            const result = await chatsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting chat:", err);
        }
    },
    addMessage: async (chatId, messageData) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            const result = await chatsCollection.updateOne(
                { _id: new ObjectId(chatId) },
                {
                    $push: { messages: messageData },
                    $set: {
                        lastMessage: messageData.text,
                        lastMessageTime: new Date(),
                    }
                }
            );
            return result;
        } catch (err) {
            console.error("Error adding message to chat:", err);
        }
    },
    removeMessage: async (chatId, messageId) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('chats');
            const result = await chatsCollection.updateOne(
                { _id: new ObjectId(chatId) },
                { $pull: { messages: { _id: new ObjectId(messageId) } } }
            );
            return result;
        } catch (err) {
            console.error("Error removing message from chat:", err);
        }
    }
};

module.exports = Chat;
