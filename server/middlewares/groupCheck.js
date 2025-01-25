const Group = require('../model/Groups.js');

const ifGroupIDExists = async (req, res, next) => {
    const { id } = req.params;
    try {
        const grp = await Group.findById(id);
        if (grp) {
            req.group = grp
            console.log("Inside grp Middleware: ", req.group)
            next()
        }
        else {
            return res.status(400).json({ success: false, message: 'No grp found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating grp', error: error.message });
    }
}

const ifGroupNameExists = async (req, res, next) => {
    const { name } = req.body;
    try {
        const grp = await Group.findOne({ name });
        if (grp) {
            return res.status(400).json({ success: false, message: 'grp name already exists' });
        }
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating grp', error: error.message });
    }
}

module.exports = { ifGroupIDExists, ifGroupNameExists }