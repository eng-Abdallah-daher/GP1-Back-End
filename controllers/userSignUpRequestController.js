const UserSignUpRequest = require('../models/userSignUpRequestModel');

const createUserSignUpRequests = async (req, res) => {
  try {
   
    const userRequests={
      'id':req.body['id'],
      "name": req.body['name'],
      "email": req.body['email'],
      "phone": req.body['phone'],
       'description':req.body['description'],
      "latitude": req.body['latitude'],
      "longitude": req.body['longitude'],
      "images": req.body['images'],
      "password": req.body['password'],
         "location": req.body['location'],
    }
   
    const result = await UserSignUpRequest.createMany(userRequests);
    res.status(201).json({ message: 'User sign-up requests added successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user sign-up requests', error });
  }
};

const getAllUserSignUpRequests = async (req, res) => {
  try {
    const userRequests = await UserSignUpRequest.getAll();
    res.status(200).json(userRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user sign-up requests', error });
  }
};

const deleteUserSignUpRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserSignUpRequest.delete(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User sign-up request not found' });
    }
    res.status(200).json({ message: 'User sign-up request deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user sign-up request', error });
  }
};

module.exports = {
  createUserSignUpRequests,
  getAllUserSignUpRequests,
  deleteUserSignUpRequest,
};
