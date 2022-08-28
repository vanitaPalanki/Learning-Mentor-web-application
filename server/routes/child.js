const express = require('express');
const {check} = require('express-validator');

const childController = require('../controllers/child-controller');

const crouter = express.Router();

crouter.post('/register', [
    check('name')
    .not()
    .isEmpty(),
    check('dob')
    .not()
    .isEmpty()
],  childController.registerChild );

crouter.get('/:uid', childController.getChildByUid);

crouter.get('/:cid', childController.getChildByCid);
//crouter.get('', );

module.exports = crouter;