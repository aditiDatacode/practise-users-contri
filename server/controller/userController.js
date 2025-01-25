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
  if (!req.user) {
    res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, user: req.user });


  // const { id } = req.params;
  // try {
  //   const user = await User.findById(id);
  //   if (!user) {
  //     return res.status(404).json({ success: false, message: 'User not found' });
  //   }
  //   res.status(200).json({ success: true, user });
  // } catch (error) {
  //   res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  // }
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

// CONTRIBUTIONS

// how to verify if contri already exists
const createContribution = async (req, res) => {
  const { user, description } = req.body;
  try {
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const contribution = new Contribution({ user, description });
    await contribution.save();
    res.status(201).json({ success: true, message: 'Contribution created successfully', contribution: contribution });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating contribution', error: error.message });
  }
};

const getContribution = async (req, res) => {
  const { id } = req.params;
  try {
    const contribution = await Contribution.findById(id).populate('user', 'username email');
    if (!contribution) {
      return res.status(404).json({ success: false, message: 'Contribution not found' });
    }
    res.status(200).json({ success: true, contribution });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contribution', error: error.message });
  }
};

const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find().populate('user', 'username email');
    res.status(200).json({ success: true, contributions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contributions', error: error.message });
  }
};

const updateContribution = async (req, res) => {
  const { id } = req.params;
  const { user, description } = req.body;
  try {
    const contribution = await Contribution.findByIdAndUpdate(
      id,
      { user, description },
      { new: true, runValidators: true }
    );
    if (!contribution) {
      return res.status(404).json({ success: false, message: 'Contribution not found' });
    }
    res.status(200).json({ success: true, message: 'Contribution updated successfully', contribution });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contribution', error: error.message });
  }
};

const deleteContribution = async (req, res) => {
  // const { ids } = req.params;
  const { query: { ids } } = req;
  if (!ids) {
    return res.status(400).json({ success: false, message: 'No IDs provided' });
  }
  const idArray = ids.split(',');
  if (idArray.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid ID format provided' });
  }

  try {
    const result = await Contribution.deleteMany({ _id: { $in: idArray } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No contributions found with the provided IDs' });
    }
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} contribution(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting contribution', error: error.message });
  }
};


// GROUPS
const createGroup = async (req, res) => {
  const { name, description, users } = req.body;

  if (!name || !description || !users) {
    return res.status(400).json({ success: false, message: 'Name, description, and users are required' });
  }

  try {
    const newGroup = new Group({ name, description, users });
    await newGroup.save();
    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group: newGroup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating group',
      error: error.message,
    });
  }

}

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('user');
    res.status(200).json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching groups', error: error.message });
  }
}


module.exports = {
  createUser, getUserById, updateUserById, deleteUserById, getAllUsers,
  createContribution, getContribution, updateContribution, deleteContribution, getAllContributions,
  createGroup, getAllGroups
}
