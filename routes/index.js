const router = require("express").Router();
const { register, login, test, getUsers, getUserDetails, updateUser, deleteUser, health } = require("../controllers/user");
const { addBalanceSheet, getBalanceSheet } = require("../controllers/manager");
const { verifyTokenAuthLogin } = require("../middleware/AuthLogin")


//user
router.post('/register', register);
router.post('/login', login);
router.get('/test', verifyTokenAuthLogin, test);
router.get('/getUsers', getUsers);
router.get('/getUserDetail/:userName', getUserDetails);
router.post('/updateUser/:userName', updateUser);
router.delete('/deleteUser/:userName', deleteUser);
router.get('/', health);

//manager
router.post('/addBalanceSheet', addBalanceSheet);
router.get('/getBalanceSheet', getBalanceSheet);
// router.get('/getEmployeeDetail/:employeeId', getEmployeeDetails);
// router.post('/updateEmployee/:employeeName', updateEmployee);
// router.delete('/deleteEmployee/:employeeName', deleteEmployee);

module.exports = router;