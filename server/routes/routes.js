const express = require("express");
const { createUser, getUserById, updateUserById, deleteUserById, getAllUsers, } = require("../controller/userController.js");
const { createContribution, getContribution, updateContribution, deleteContribution, getAllContributions, } = require("../controller/contriController.js");
const { createGroup, getAllGroups, getGroup, updateGroup, deleteGroup } = require("../controller/groupController.js");
const { ifUserIDExists, ifUserExists } = require("../middlewares/userCheck.js")
const { ifContriExists } = require("../middlewares/contriCheck.js")
const { ifGroupIDExists, ifGroupNameExists } = require("../middlewares/groupCheck.js")

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
router.delete('/contribution', deleteContribution) // array of IDs passed in query

router.get('/groups', getAllGroups)
router.get('/group/:id', ifGroupIDExists, getGroup) // accID
router.post('/group', ifGroupNameExists, createGroup) // studID 
router.patch('/group/:id', ifGroupIDExists, updateGroup)
router.delete('/group/:id', ifGroupIDExists, deleteGroup)

module.exports = router;