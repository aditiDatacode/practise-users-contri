const express = require("express");
const {
    createUser, getUserById, updateUserById, deleteUserById, getAllUsers,
    createContribution, getContribution, updateContribution, deleteContribution, getAllContributions,
    createGroup, getAllGroups
}
    = require("../controller/userController.js");
const { ifUserIDExists, ifUserExists } = require("../middlewares/ifExists.js")

const router = express.Router();

router.get('/user/:id', ifUserIDExists, getUserById)
router.get('/users', getAllUsers)
router.post('/user', ifUserExists, createUser)
router.patch('/user/:id', ifUserIDExists, updateUserById)
router.delete('/user/:id', ifUserIDExists, deleteUserById)

router.get('/contribution/:id', getContribution)
router.get('/contributions', getAllContributions)
router.post('/contribution', createContribution)
router.patch('/contribution/:id', updateContribution)
router.delete('/contribution', deleteContribution)

router.get('/groups', getAllGroups)
// router.get('/group/:id', getGroup) // accID
router.post('/group', createGroup) // studID 
// router.patch('/group/:id', updateGroup)
// router.delete('/group/:id', deleteGroup)


module.exports = router;