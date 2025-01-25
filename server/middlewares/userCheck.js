const User = require('../model/Users.js')

const ifUserIDExists = async (req, res, next) => {
  const { params: { id } } = req
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    req.user = user
    console.log("Inside User Middleware: ", id)
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
}

const ifUserExists = async (req, res, next) => {
  const { body: { username, email } } = req
  try {
    const user = await User.findOne({ username, email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
}

// being exported as an object because {}, if not then as fn
module.exports = { ifUserIDExists, ifUserExists }