const HttpError = require('../models/http-error');
const Assessment = require('../models/assessment-model');
const Question = require('../models/question-model');
const { default: mongoose } = require('mongoose');
//const assessmentModel = require('../models/assessment-model');

const createAssessment = async (req, res, next) => {
     const { a_name, description, a_type, question } = req.body;
     let existingAssessment
     try{
        existingAssessment = await Assessment.findOne({a_name:a_name, a_type:a_type})
     }catch (err) {
        const error = new HttpError('Finding assessment failed, please try again later.', 500);
        return next(error);
     }

     if (existingAssessment) {
        const error = new HttpError('Assessment exist already. please try adding questions instead', 422);
        return next(error);
     }

     const cAssessment = new Assessment({
        a_name,
        description, 
        a_type,
        question_no:[]
     });

     try{
        await cAssessment.save();
        //const assessmentId = cAssessment._id.toString();
        //console.log(assessmentId);
     }catch (err) {
        const error = new HttpError('Creating assessment failed, please try again.', 500);
        return next(error);
     }

     const assessmentId = cAssessment._id.toString();
     console.log(assessmentId);
     

     const insertQuestion = new Question({
        aid: assessmentId,
        question,
     })

     try {
      const sess  = await mongoose.startSession();
      sess.startTransaction();
      await insertQuestion.save({ session: sess });
      cAssessment.question_no.push(insertQuestion);
      await cAssessment.save({ session: sess});
      await sess.commitTransaction();
     }catch (err) {
      const error = new HttpError('Inserting questions failed, please try again later.', 500);
      return next(error);
     }

     res.status(201).json({assessment: cAssessment.toObject({ getters: true }), questions: insertQuestion.toObject({ getters:true })});
}

const addQuestion = async ( req, res, next ) => {
   const { aid, question } = req.body;
   //const assessmentId = req.params.aid;

   const insertQuestion = new Question({
      aid,
      question,
   })

   //console.log(mongoose.Types.ObjectId.isValid('62ae0150934b8cba53036a9a'));
   let existingAssessment;
   try{
      existingAssessment = await Assessment.findById(aid);
   }catch (err) {
      const error = new HttpError('Something went wrong, please try again later.', 500);
      return next(error);
   }

   if(!existingAssessment) {
      const error = new HttpError('Could not find the assessment, please create an assessment first.', 404);
      return next(error);
   }
   
   console.log(existingAssessment)

   const sess  = await mongoose.startSession();
   sess.startTransaction();
   await insertQuestion.save({ session: sess });
   existingAssessment.question_no.push(insertQuestion);
   await existingAssessment.save({ session: sess});
   await sess.commitTransaction();

   res.status(201).json({ question: insertQuestion });
   
}

const getAssessment = async(req, res, next) => {
   const assessmentId = req.params.aid;
   console.log(assessmentId);

   let assessment;
   try{
      assessment = await Assessment.find({ aid:assessmentId });
   }catch(err){
      const error = new HttpError('Fetching assessment failed, please try again later.', 500);
      return next(error);
   }

   if(!assessment || assessment.length === 0) {
      const error = new HttpError(' Could not find the assessment for the provided assessment ID.', 404);
      return next(error);
   }

   res.json({ assessment: assessment.map(question => question.toObject({ getters: true}))});
};

const getQuestion = async( req, res, next) => {
   const questionId = req.params.qid;

   let question;
   try{
      question = await Question.findById(questionId);
   }catch(err) {
      const error = new HttpError(' Something went wronf, please try again later.', 500);
      return next(error);
   }

   if (!question) {
      const error = new HttpError(' could not find the question for the give question ID.', 404);
      return next(error);
   }

   res.json({ question: question.toObject({ getters: true })});
};

const updateAssessment = async( req, res, next) => {
   const { a_name, description } = req.body;
   const assessmentID = req.params.aid;

   let assessment;
   try{
      assessment = await Assessment.findById(assessmentID);
   } catch(err) {
      const error = new HttpError('Something went wrong , please try again later.', 500);
      return next(error);
   }

   assessment.a_name = a_name;
   assessment.description = description;

   try{
      await assessment.save();
   }catch (err) {
      const error = new HttpError(' Updating assessmnrt failed, please try again later.', 404);
      return next(error);
   }

   res.status(200).json({ assessment: assessment.toObject({ getters:true })});
};

const updateQuestion = async ( req, res, next) => {
   const { question } = req.body;
   const questionID = req.params.body;

   let updateQuestion;
   try {
      updateQuestion = await Question.findById(questionID);
   }catch (err) {
      const error = HttpError(' Something went wrong, please try again later.', 500);
      return next(error);
   }

   updateQuestion.question = question;

   try{
      await updateQuestion.save();
   }catch (err) {
      const error = new HttpError(' Updating Question failed, please try again later.', 404);
      return next(error);
   }

   res.status(200).json({updateQuestion: updateQuestion.toObject({ getters: true})});
};

const deleteAssessment = async ( req, res, next) => {
   const assessId = req.params.aid;
   console.log(assessId); 
   let assessment;
   try{
      assessment = await Assessment.findById(assessId);
   }catch (err){
      const error = new HttpError('Could not find the assessment, Please try again later', 500);
      return next(error);
   }
   //console.log(assessment); 
   //await assessment.remove();
   try {
      await assessment.remove();
   }catch (err) {
      const error = new HttpError(' Deleting assessment failed, please try again later.', 500);
    return next (error); 
   }

   res.status(200).json({ message: 'Deleted assessment.'});
};

const deleteQuestion = async (req, res, next) => {
   const qesId = req.params.qid;

   let question;
   try{
      question = await Question.findById(qesId);
   } catch (err) {
      const error = new HttpError(' Finding question failed, please try again later.', 500);
      return next (error);
   }

   try{
      await question.remove();
   }catch (err) {
      const error = new HttpError(' Deleting question failed, please try again later.', 500);
      return next (error);
   }

   res.status(200).json({ message: ' Deleted question. '});
}

exports.createAssessment = createAssessment;
exports.addQuestion = addQuestion;
exports.getAssessment = getAssessment;
exports.getQuestion = getQuestion;
exports.updateAssessment = updateAssessment;
exports.updateQuestion = updateQuestion;
exports.deleteAssessment = deleteAssessment;
exports.deleteQuestion = deleteQuestion;
