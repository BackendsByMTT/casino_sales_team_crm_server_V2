const router = require("express").Router();
const { register, login, logout, getUsers, getUserDetails, updateUser, deleteUser, health } = require("../controllers/user");
const { addEmployee, getBalanceSheetList, getEmployeeDetails, updateEmployee, deleteEmployee, getCoinSheetList, addToCoinSheet, getCoinDetails, updateCoinDetails, deleteCoinDetails, addFbUser, getFbUsers, getFbUserDetail, updateFbUser, deleteFbUser } = require("../controllers/manager");
const { verifyTokenAuthLogin, verifyDesgination } = require("../middleware/AuthLogin")
const { addCustomer, getCustomers, getCustomerDetails, updateCustomer, deleteCustomer } = require("../controllers/tl")
const { addFreshMessage, getFreshMessages, getFreshMessageDetails, updateFreshMessage, deleteFreshMessage, addAgent, getAgents, getAgentDetails, updateAgent, deleteAgent } = require("../controllers/agent")


//user
router.post('/register', register);
router.post('/login', login);
router.get('/getUsers', verifyDesgination, getUsers);
router.get('/getUserDetail/:userName', verifyDesgination, getUserDetails);
router.put('/updateUser/:userName', verifyDesgination, updateUser);
router.delete('/deleteUser/:userName', verifyDesgination, deleteUser);
router.put('/logout', logout)
router.get('/', health);

//BalanceSheet
router.post('/addEmployee', verifyDesgination, addEmployee);
router.get('/getBalanceSheetList', verifyDesgination, getBalanceSheetList);
router.get('/getEmployeeDetails/:employeeName', verifyDesgination, getEmployeeDetails);
router.put('/updateEmployee/:employeeName', verifyDesgination, updateEmployee);
router.delete('/deleteEmployee/:employeeName', verifyDesgination, deleteEmployee);


//coinSheet
router.get('/getCoinSheetList', verifyDesgination, getCoinSheetList);
router.post('/addToCoinSheet', verifyDesgination, addToCoinSheet);
router.get('/getCoinDetails/:initialCoins', verifyDesgination, getCoinDetails);
router.put('/updateCoinDetails/:initialCoins', verifyDesgination, updateCoinDetails);
router.delete('/deleteCoinDetails/:initialCoins', verifyDesgination, deleteCoinDetails);

//fbAccout
router.post('/addFbUser', verifyDesgination, addFbUser);
router.get('/getFbUsers', verifyDesgination, getFbUsers);
router.get('/getFbUserDetail/:userName', verifyDesgination, getFbUserDetail);
router.put('/updateFbUser/:userName', verifyDesgination, updateFbUser);
router.delete('/deleteFbUser/:userName', verifyDesgination, deleteFbUser);

//tl
router.post('/addCustomer', verifyDesgination, addCustomer);
router.get('/getCustomers', verifyDesgination, getCustomers);
router.get('/getCustomerDetails/:customerName', verifyDesgination, getCustomerDetails);
router.put('/updateCustomer/:customerName', verifyDesgination, updateCustomer);
router.delete('/deleteCustomer/:customerName', verifyDesgination, deleteCustomer);

//Freshmessage
router.post('/addFreshMessage', verifyTokenAuthLogin, addFreshMessage);
router.get('/getFreshMessages', verifyTokenAuthLogin, getFreshMessages);
router.get('/getFreshMessageDetails/:agentName', verifyTokenAuthLogin, getFreshMessageDetails);
router.put('/updateFreshMessage/:agentName', verifyTokenAuthLogin, updateFreshMessage);
router.delete('/deleteFreshMessage/:agentName', verifyTokenAuthLogin, deleteFreshMessage);

//agent
router.post('/addAgent/:name', verifyTokenAuthLogin, addAgent);
router.get('/getAgents/:name', verifyTokenAuthLogin, getAgents);
router.get('/getAgentDetails/:name/:agentName', verifyTokenAuthLogin, getAgentDetails);
router.put('/updateAgent/:name/:agentName', verifyTokenAuthLogin, updateAgent);
router.delete('/deleteAgent/:name/:agentName', verifyDesgination, deleteAgent);



module.exports = router;