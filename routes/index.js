const router = require("express").Router();
const { register, login, test, getUsers, getUserDetails, updateUser } = require("../controllers/user");
const { verifyTokenAuthLogin } = require("../middleware/AuthLogin")

router.post('/register', register);
router.post('/login', login);
router.get('/test', verifyTokenAuthLogin, test);
router.get('/getUsers', getUsers);
router.get('/getUserDetail/:userName', getUserDetails);
router.post('/updateUser/:userName', updateUser);


module.exports = router;