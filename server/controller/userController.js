require('../config/db.js')
const User = require('../model/Users.js')

// USER 
const createUser = async (req, res) => {
  const { body: { username, email } } = req
  try {
    const user = new User({ username, email });
    await user.save();
    res.status(201).json({ success: true, message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
};

const getUserById = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

const updateUserById = async (req, res) => {
  const { body: { username, email }, user } = req;
  try {
    user.username = username;
    user.email = email
    const updatedUser = await user.save({ validateBeforeSave: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Some user update error' });
    }
    res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { user } = req;
  try {
    await user.delete();
    res.status(200).json({ success: true, message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};




module.exports = {
  createUser, getUserById, updateUserById, deleteUserById, getAllUsers,
}
