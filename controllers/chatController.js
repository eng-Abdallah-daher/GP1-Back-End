const Chat = require('../models/chatModel');

const createChat = async (req, res) => {
    try {
        const chatData = req.body;
        const result = await Chat.create(chatData);
        res.status(201).json({
            message: 'Chat created successfully',
            chat: result.ops[0]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }
};

const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.getAll();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chats', error });
    }
};

const getChatById = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.getById(id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat', error });
    }
};

const updateChat = async (req, res) => {
    try {
        const { id } = req.params;
        const chatData = req.body;
        const result = await Chat.update(id, chatData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating chat', error });
    }
};

const addMessageToChat = async (req, res) => {
    try {
        const { id,senderId, content ,createdAt} = req.body;
        console.log(req.body);
        console.log(id,senderId, content, createdAt);
        const result = await Chat.addMessage(id,senderId, content ,createdAt);
        res.status(200).json({ message: 'Message added to chat successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding message to chat', error });
    }
};

const removeMessageFromChat = async (req, res) => {
    try {
        const { chatId, messageId } = req.body;
        const result = await Chat.removeMessage(chatId, messageId);
        res.status(200).json({ message: 'Message removed from chat successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing message from chat', error });
    }
};

const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Chat.delete(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting chat', error });
    }
};

module.exports = {
    createChat,
    getAllChats,
    getChatById,
    updateChat,
    addMessageToChat,
    removeMessageFromChat,
    deleteChat
};
