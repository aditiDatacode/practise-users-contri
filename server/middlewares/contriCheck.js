const Contribution = require('../model/Contributions.js');

const ifContriExists = async (req, res, next) => {
    const { id, description } = req.body;
    try {
        const contri = await Contribution.findById(id);
        if (contri) {
            req.contri = contri
            console.log("Inside contri Middleware: ", req.contri)
            next()
        }
        else {
            return res.status(400).json({ success: false, message: 'No Contri found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
}

module.exports = { ifContriExists }