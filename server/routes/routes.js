const express = require("express");
const { createUser, getUserById, updateUserById, deleteUserById, getAllUsers, } = require("../controller/userController.js");
const { createContribution, getContribution, updateContribution, deleteContribution, getAllContributions, } = require("../controller/contriController.js");
const { createGroup, getAllGroups } = require("../controller/groupController.js");
const { ifUserIDExists, ifUserExists } = require("../middlewares/userCheck.js")
const { ifContriExists } = require("../middlewares/contriCheck.js")

const router = express.Router();

router.get('/user/:id', ifUserIDExists, getUserById)
router.get('/users', getAllUsers)
router.post('/user', ifUserExists, createUser)
router.patch('/user/:id', ifUserIDExists, updateUserById)
router.delete('/user/:id', ifUserIDExists, deleteUserById)

router.get('/contribution/:id', getContribution)
router.get('/contributions', getAllContributions)
router.post('/contribution/:id', ifUserIDExists, createContribution) // userId
router.patch('/contribution/:id', ifUserIDExists, ifContriExists, updateContribution) // contriId
router.delete('/contribution', deleteContribution)

router.get('/groups', getAllGroups)
// router.get('/group/:id', getGroup) // accID
router.post('/group', createGroup) // studID 
// router.patch('/group/:id', updateGroup)
// router.delete('/group/:id', deleteGroup)

module.exports = router;