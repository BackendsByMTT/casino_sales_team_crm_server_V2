const router = require("express").Router();
const { register, login, test, getUsers, getUserDetails, updateUser, deleteUser, health } = require("../controllers/user");
const { addEmployee, getBalanceSheetList, getEmployeeDetails, updateEmployee, deleteEmployee, getCoinSheetList, addToCoinSheet, getCoinDetails, updateCoinDetails, deleteCoinDetails, addFbUser, getFbUsers, getFbUserDetail, updateFbUser, deleteFbUser } = require("../controllers/manager");
const { verifyTokenAuthLogin } = require("../middleware/AuthLogin")
const { addCustomer, getCustomers, getCustomerDetails, updateCustomer, deleteCustomer } = require("../controllers/tl")


//user
router.post('/register', register);
router.post('/login', login);
router.get('/test', verifyTokenAuthLogin, test);
router.get('/getUsers', getUsers);
router.get('/getUserDetail/:userName', getUserDetails);
router.post('/updateUser/:userName', updateUser);
router.delete('/deleteUser/:userName', deleteUser);
router.get('/', health);

//BalanceSheet
router.post('/addEmployee', addEmployee);
router.get('/getBalanceSheetList', getBalanceSheetList);
router.get('/getEmployeeDetails/:employeeName', getEmployeeDetails);
router.post('/updateEmployee/:employeeName', updateEmployee);
router.delete('/deleteEmployee/:employeeName', deleteEmployee);

//coinSheet

router.get('/getCoinSheetList', getCoinSheetList);
router.post('/addToCoinSheet', addToCoinSheet);
router.get('/getCoinDetails/:initialCoins', getCoinDetails);
router.post('/updateCoinDetails/:initialCoins', updateCoinDetails);
router.delete('/deleteCoinDetails/:initialCoins', deleteCoinDetails);

//fbAccout
router.post('/addFbUser', addFbUser);
router.get('/getFbUsers', getFbUsers);
router.get('/getFbUserDetail/:userName', getFbUserDetail);
router.post('/updateFbUser/:userName', updateFbUser);
router.delete('/deleteFbUser/:userName', deleteFbUser);

//tl
router.post('/addCustomer', addCustomer);
router.get('/getCustomers', getCustomers);
router.get('/getCustomerDetails/:customerName', getCustomerDetails);
router.post('/updateCustomer/:customerName', updateCustomer);
router.delete('/deleteCustomer/:customerName', deleteCustomer);



module.exports = router;