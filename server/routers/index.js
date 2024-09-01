const express = require('express');
const registerUser = require('../controllers/registerUser');
const checkEmail = require('../controllers/checkEmail');
const checkPawword = require('../controllers/checkPassword');

const router = express.Router();

// create user api
router.post("/register", registerUser);
// check user email
router.post("/email", checkEmail);
// check user Password
router.post("/password", checkPawword);



module.exports = router;



