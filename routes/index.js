const router = require("express").Router();
const { register, login, test, getUsers, getUserDetails, updateUser, deleteUser, health } = require("../controllers/user");
const { addEmployee, getBalanceSheetList, getEmployeeDetails, updateEmployee, deleteEmployee, getCoinSheetList, addToCoinSheet, getCoinDetails, updateCoinDetails, deleteCoinDetails, addFbUser, getFbUsers, getFbUserDetail, updateFbUser, deleteFbUser } = require("../controllers/manager");
const { verifyTokenAuthLogin } = require("../middleware/AuthLogin")
const { addCustomer, getCustomers, getCustomerDetails, updateCustomer, deleteCustomer } = require("../controllers/tl")
const { addFreshMessage, getFreshMessages, getFreshMessageDetails, updateFreshMessage, deleteFreshMessage, addAgent, getAgents, getAgentDetails, updateAgent, deleteAgent } = require("../controllers/agent")


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

//Freshmessage
router.post('/addFreshMessage', addFreshMessage);
router.get('/getFreshMessages', getFreshMessages);
router.get('/getFreshMessageDetails/:agentName', getFreshMessageDetails);
router.post('/updateFreshMessage/:agentName', updateFreshMessage);
router.delete('/deleteFreshMessage/:agentName', deleteFreshMessage);

//agent
router.post('/addAgent/:name', addAgent);
router.get('/getAgents/:name', getAgents);
router.get('/getAgentDetails/:name/:agentName', getAgentDetails);
router.post('/updateAgent/:name/:agentName', updateAgent);
router.delete('/deleteAgent/:name/:agentName', deleteAgent);



module.exports = router;