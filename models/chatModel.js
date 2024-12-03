const db = require('../config/db');

const Chat = {
    getAll: (callback) => {
        db.query('SELECT * FROM Chat', callback);
      
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Chat WHERE id = ?', [id], callback);
       

    },
    create: (chat, callback) => {
        console.log(chat)
       try{
         const { user1Id, user2Id } = chat;
        
        db.query(
            'INSERT INTO Chat (user1Id, user2Id) VALUES (?, ?)',
            [user1Id, user2Id],
            callback
        );
       }catch(err){
         console.log(err);
       }
    },
    update: (id, chat, callback) => {
        const { user1Id, user2Id, lastMessage } = chat;
        db.query(
            'UPDATE Chat SET user1Id = ?, user2Id = ?, lastMessage = ? WHERE id = ?',
            [user1Id, user2Id, lastMessage, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Chat WHERE id = ?', [id], callback);
    },
};

module.exports = Chat;
