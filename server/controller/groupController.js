const Group = require('../model/Groups.js');

const createGroup = async (req, res) => {
    const { name, description, users } = req.body;
    try {
        // whether to check if every userID exist in cluster ?
        const newGroup = new Group({ name, description, users });
        await newGroup.save();
        res.status(201).json({ success: true, message: 'Group created successfully', group: newGroup, });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating group', error: error.message, });
    }
}

const getGroup = async (req, res) => {
    const { group } = req
    res.status(200).json({ success: true, group });
}

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('user');
        res.status(200).json({ success: true, groups });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching groups', error: error.message });
    }
}

const updateGroup = async (req, res) => {
    const { body: { name, description, users }, group, params: { id } } = req;
    try {
        group.name = name
        group.description = description
        group.users = users
        const update = await group.save({ validateBeforeSave: true });
        if (!update) {
            return res.status(404).json({ success: false, message: 'Some grp update error' });
        }
        res.status(200).json({ success: true, message: 'grp updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating grp', error: error.message });
    }
}

const deleteGroup = async (req, res) => {
    const { group } = req;
    try {
        await group.delete();
        res.status(200).json({ success: true, message: 'grp deleted successfully', group });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting grp', error: error.message });
    }
}

module.exports = {
    createGroup, getAllGroups, getGroup, updateGroup, deleteGroup
}