const express = require('express');
const {check} = require('express-validator');

const userController = require('../controllers/users-controllers');
//const userProfileControllers = require('../controllers/userprofile-controllers');

const router = express.Router();

router.get('/:utype', userController.getConsultant );

router.post('/signup',
[
    check('first_name')
    .not()
    .isEmpty(),
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('password')
    .isLength( {min: 6})
],  userController.signup );


router.post  ('/login', userController.login);
router

module.exports = router;