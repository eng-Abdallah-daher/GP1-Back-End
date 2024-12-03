const Chat = require('../models/chatModel');


const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.getAll();
         
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve chats' ,});
    }
};

const getChatById = async (req, res) => {
    try {
        const chat = await Chat.getById(req.params.id);
        
        if (!chat) return res.status(404).json({ error: 'Chat not found' });
       
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve chat' });
    }
};

const createChat = async (req, res) => {
    try {
        const { user1Id, user2Id} = req.body;
    const m=req.body['lastMessage']
        const chat = await Chat.create({ user1Id, user2Id,m});
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chat' });
    }
};

const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findByPk(req.params.id);
        if (!chat) return res.status(404).json({ error: 'Chat not found' });
        await chat.destroy();
        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete chat' });
    }
};

const getMessagesByChatId = async (req, res) => {
    try {
        const messages = await Message.findAll({ where: { chatId: req.params.chatId } });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

const addMessageToChat = async (req, res) => {
    try {
        const { chatId, senderId, content } = req.body;
        const message = await Message.create({ chatId, senderId, content });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add message' });
    }
};

module.exports = {
    getAllChats,
    getChatById,
    createChat,
    deleteChat,
    getMessagesByChatId,
    addMessageToChat,
};
