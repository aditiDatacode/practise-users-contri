require('../config/db.js')
const User = require('../model/Users.js')
const Contribution = require('../model/Contributions.js');
const Group = require('../model/Groups.js');

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
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
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
  createUser, getUserById, updateUserById, deleteUserById, getAllUsers
}
