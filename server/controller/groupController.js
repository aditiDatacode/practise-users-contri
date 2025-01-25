const Group = require('../model/Groups.js');


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
    createGroup, getAllGroups
}