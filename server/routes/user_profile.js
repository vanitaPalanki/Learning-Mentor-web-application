const express = require('express');
const {check} = require('express-validator');

const userProfileControllers = require('../controllers/userprofile-controllers');
const router = require('./user');

const uprouter = express.Router();

uprouter.get('/user/:uid', userProfileControllers.getUserProfileByUid);

uprouter.get('/:pid', userProfileControllers.getUserProfileById);

uprouter.patch('/:pid', userProfileControllers.updateUserProfile);

module.exports = uprouter;