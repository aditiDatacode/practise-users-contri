const Contribution = require('../model/Contributions.js');


// how to verify if contri already exists
const createContribution = async (req, res) => {
  try {
    if (req.user) {
      const contribution = new Contribution({ user: req.user._id, description });
      await contribution.save();
      res.status(201).json({ success: true, message: 'Contribution created successfully', contribution: contribution });
    }
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
  const { contri, body: { description }, params: { id } } = req;
  console.log("inside updateContribution: ", contri)
  try {
    contri.user = id;
    contri.description = description;
    // await contri.validate(); not req then
    const update = await contri.save({ validateBeforeSave: true });
    if (update) {
      res.status(200).json({ success: true, message: 'Contribution updated successfully', contribution: contri });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contribution', error: error.message });
  }
};

const deleteContribution = async (req, res) => {
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

module.exports = {
  createContribution, getContribution, updateContribution, deleteContribution, getAllContributions,
}