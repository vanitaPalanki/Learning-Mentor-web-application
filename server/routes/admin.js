const express = require('express');

const assessmentControllers = require('../controllers/assessment-controllers');

const arouter = express.Router();

arouter.post('/assessment', assessmentControllers.createAssessment);
arouter.get('/assessment/:aid', assessmentControllers.getAssessment);
arouter.get('/question/:qid', assessmentControllers.getQuestion);
arouter.patch('/assessment/:aid', assessmentControllers.updateAssessment);
arouter.patch('/question/:qid', assessmentControllers.updateQuestion);
arouter.post('/question', assessmentControllers.addQuestion);
arouter.delete('/assessment/:aid', assessmentControllers.deleteAssessment);
arouter.delete('/question/:qid', assessmentControllers.deleteQuestion);
module.exports = arouter;