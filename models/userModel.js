const db = require('../config/db');

const getAllUsers = (callback) => {
    db.query('SELECT * FROM Users', callback);
};

const getUserById = (id, callback) => {
    db.query('SELECT * FROM Users WHERE id = ?', [id], callback);
};

const addUser = (userData, callback) => {
   try{
 const query = `
        INSERT INTO Users (name, phone, email, password, carPlateNumber, role, profileImage, description, location, isServiceActive)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        userData.name,
        userData.phone,
        userData.email,
        userData.password,
        userData.carPlateNumber,
        userData.role,
        userData.profileImage || null,
        userData.description || null,
        userData.location || null,
        userData.isServiceActive ? 1 : 0,
    ];
    db.query(query, values, callback);
   }catch(e){

     console.log(e);
     callback(e, null);
   }
};

const updateUser = (id, userData, callback) => {
    const query = `
        UPDATE Users SET name = ?, phone = ?, email = ?, password = ?, carPlateNumber = ?, role = ?, profileImage = ?, description = ?, location = ?, isServiceActive = ?
        WHERE id = ?
    `;
    const values = [
        userData.name,
        userData.phone,
        userData.email,
        userData.password,
        userData.carPlateNumber,
        userData.role,
        userData.profileImage || null,
        userData.description || null,
        userData.location || null,
        userData.isServiceActive ? 1 : 0,
        id,
    ];
    db.query(query, values, callback);
};

const deleteUser = (id, callback) => {
    db.query('DELETE FROM Users WHERE id = ?', [id], callback);
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
