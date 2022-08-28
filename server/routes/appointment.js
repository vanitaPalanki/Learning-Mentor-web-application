const express = require('express');

const appointmentControllers = require('../controllers/appointment-controllers');

const approuter = express.Router();

//arouter.post('/assessment', assessmentControllers.createAssessment);

approuter.post('/create', appointmentControllers.createAppointment);
approuter.get('/:appid', appointmentControllers.getAppointment);
approuter.patch('/:appid', appointmentControllers.updateAppointment);

module.exports = approuter;