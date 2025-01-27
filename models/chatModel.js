const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Chat = {
    create: async (chatData) => {
        try {
          
            const db = client.db("gp1");
            const chatsCollection = db.collection('Chat');
            const result = await chatsCollection.insertOne(chatData);
            return result;
        } catch (err) {
            console.error("Error creating chat:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('Chat');
            return await chatsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving chats:", err);
        }
    },
 

getById: async (id) => {
    try {
       
        
      

        const db = client.db("gp1");
        const chatsCollection = db.collection('Chat');
        
        const chats = await chatsCollection.find().toArray();
        const chat = chats.find(chat => chat.id.toString() == id);

        if (!chat) {
            throw new Error("Chat not found");
        }

        const messages = chat.messages

        return {
            
            messages: messages
        };
    } catch (err) {
        console.error("Error retrieving chat by ID:", err);
    }
}
,
    update: async (id, chatData) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('Chat');
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
            const chatsCollection = db.collection('Chat');
            const result = await chatsCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting chat:", err);
        }
    },
    updatemessageread: async (chatId, msgId) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection("Chat");

            const result = await chatsCollection.updateOne(
                { id: chatId, "messages.id": msgId }, 
                { $set: { "messages.$.isread": true } } 
            );

            if (result.matchedCount === 0) {
                throw new Error(`Chat with id ${chatId} or message with id ${msgId} not found.`);
            }

            return result;
        } catch (err) {
            console.error("Error updating message read status:", err);
        }
    },
   addMessage: async (chatId,v1,v2,v3,v4,v5) => {
    try {
        const db = client.db("gp1");
        const chatsCollection = db.collection("Chat");
     
        const result = await chatsCollection.updateOne(

            { id: chatId },
            {
                $push: { messages: {
                    id:v4,
                    senderId: v1,
                    content: v2,
                    createdAt: v3,
                    isread:v5

                } },
                $set: { lastMessage: v3 },
            }
        );
        if (result.matchedCount === 0) {
            throw new Error(`Chat with id ${chatId} not found.`);
        }
        return result;
    } catch (err) {
        console.error("Error adding message to chat:", err);
    }
},
    removeMessage: async (chatId, messageId) => {
        try {
            const db = client.db("gp1");
            const chatsCollection = db.collection('Chat');
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
