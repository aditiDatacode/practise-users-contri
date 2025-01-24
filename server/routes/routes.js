const express = require("express");
const {

} = require("../controller/userController.js");

const router = express.Router();

router.get('/user/:id', getUser)
router.get('/users', getAllUsers)
router.post('/user', createUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// router.get('/exam/:id', getExam)
// router.get('/exams', getAllExams)
// router.post('/exam', createExam)
// router.patch('/exam/:id', updateExam)
// router.delete('/exam/:id', deleteExam)

// router.get('/accounts', getAllAccounts)
// router.get('/account/:id', getAccount) // accID
// router.post('/account/:id', createUserAccount) // studID 
// router.patch('/account/:id', updateAccount)
// router.delete('/account/:id', deleteAccount)


module.exports = router;