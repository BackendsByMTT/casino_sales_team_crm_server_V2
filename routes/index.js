const router = require("express").Router();
const { register, login, test, getUsers, getUserDetails, updateUser, deleteUser, health } = require("../controllers/user");
const { addEmployee, getBalanceSheetList, getEmployeeDetails, updateEmployee, deleteEmployee, getCoinSheetList, addToCoinSheet, getCoinDetails, updateCoinDetails, deleteCoinDetails, addFbUser, getFbUsers, getFbUserDetail, updateFbUser, deleteFbUser } = require("../controllers/manager");
const { verifyTokenAuthLogin, verifyDesgination } = require("../middleware/AuthLogin")
const { addCustomer, getCustomers, getCustomerDetails, updateCustomer, deleteCustomer } = require("../controllers/tl")
const { addFreshMessage, getFreshMessages, getFreshMessageDetails, updateFreshMessage, deleteFreshMessage, addAgent, getAgents, getAgentDetails, updateAgent, deleteAgent } = require("../controllers/agent")


//user
router.post('/register', register);
router.post('/login', login);
// router.get('/test', verifyTokenAuthLogin, test);
router.get('/getUsers', verifyTokenAuthLogin, getUsers);
router.get('/getUserDetail/:userName', verifyTokenAuthLogin, getUserDetails);
router.post('/updateUser/:userName', verifyDesgination, updateUser);
router.delete('/deleteUser/:userName', verifyDesgination, deleteUser);
router.get('/', health);

//BalanceSheet
router.post('/addEmployee', verifyDesgination, addEmployee);
router.get('/getBalanceSheetList', verifyDesgination, getBalanceSheetList);
router.get('/getEmployeeDetails/:employeeName', verifyDesgination, getEmployeeDetails);
router.post('/updateEmployee/:employeeName', verifyDesgination, updateEmployee);
router.delete('/deleteEmployee/:employeeName', verifyDesgination, deleteEmployee);

//coinSheet

router.get('/getCoinSheetList', verifyDesgination, getCoinSheetList);
router.post('/addToCoinSheet', verifyDesgination, addToCoinSheet);
router.get('/getCoinDetails/:initialCoins', verifyDesgination, getCoinDetails);
router.post('/updateCoinDetails/:initialCoins', verifyDesgination, updateCoinDetails);
router.delete('/deleteCoinDetails/:initialCoins', verifyDesgination, deleteCoinDetails);

//fbAccout
router.post('/addFbUser', verifyDesgination, addFbUser);
router.get('/getFbUsers', verifyDesgination, getFbUsers);
router.get('/getFbUserDetail/:userName', verifyDesgination, getFbUserDetail);
router.post('/updateFbUser/:userName', verifyDesgination, updateFbUser);
router.delete('/deleteFbUser/:userName', verifyDesgination, deleteFbUser);

//tl
router.post('/addCustomer', verifyDesgination, addCustomer);
router.get('/getCustomers', verifyDesgination, getCustomers);
router.get('/getCustomerDetails/:customerName', verifyDesgination, getCustomerDetails);
router.post('/updateCustomer/:customerName', verifyDesgination, updateCustomer);
router.delete('/deleteCustomer/:customerName', verifyDesgination, deleteCustomer);

//Freshmessage
router.post('/addFreshMessage', verifyDesgination, addFreshMessage);
router.get('/getFreshMessages', verifyDesgination, getFreshMessages);
router.get('/getFreshMessageDetails/:agentName', verifyDesgination, getFreshMessageDetails);
router.post('/updateFreshMessage/:agentName', verifyDesgination, updateFreshMessage);
router.delete('/deleteFreshMessage/:agentName', verifyDesgination, deleteFreshMessage);

//agent
router.post('/addAgent/:name', verifyDesgination, addAgent);
router.get('/getAgents/:name', verifyDesgination, getAgents);
router.get('/getAgentDetails/:name/:agentName', verifyDesgination, getAgentDetails);
router.post('/updateAgent/:name/:agentName', verifyDesgination, updateAgent);
router.delete('/deleteAgent/:name/:agentName', verifyDesgination, deleteAgent);



module.exports = router;