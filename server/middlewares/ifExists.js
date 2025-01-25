const User = require('../model/Users.js')

const ifUserExists = async (req, res, next) => {
  const { params: { id } } = req
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
}

module.exports = { ifUserExists }