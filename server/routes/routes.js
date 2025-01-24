const express = require("express");
const {
    createUser, getUserById, updateUserById, deleteUserById, getAllUsers,
    createContribution, getContribution, updateContribution, deleteContribution, getAllContributions,
}
    = require("../controller/userController.js");

const router = express.Router();

router.get('/user/:id', getUserById)
router.get('/users', getAllUsers)
router.post('/user', createUser)
router.patch('/user/:id', updateUserById)
router.delete('/user/:id', deleteUserById)

router.get('/contribution/:id', getContribution)
router.get('/contributions', getAllContributions)
router.post('/contribution', createContribution)
router.patch('/contribution/:id', updateContribution)
router.delete('/contribution', deleteContribution)

// router.get('/accounts', getAllAccounts)
// router.get('/account/:id', getAccount) // accID
// router.post('/account/:id', createUserAccount) // studID 
// router.patch('/account/:id', updateAccount)
// router.delete('/account/:id', deleteAccount)


module.exports = router;