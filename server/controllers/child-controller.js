const  mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const ChildModel = require('../models/child-model');
const User = require('../models/user-model');


const registerChild = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs, please check')
        );
    }

    const { pid, name, dob, gender, mother_tounge, Grade, school, education, school_medium, relationship, parents_education, parents_income} = req.body;

    const createdChild = new ChildModel({
        pid, 
        name, 
        dob, 
        gender, 
        mother_tounge, 
        Grade, school, 
        education, 
        school_medium, 
        relationship, 
        parents_education, 
        parents_income
    });
    
    let user;
    try{
        user = await User.findById(pid);
    }catch (err) {
        const error = new HttpError('Registering child failed again, please try again', 500);
        return next(error);
    }

    if(!user) {
        const error = new HttpError(' could not find the user for provided id', 404);
        return next(error);
    }
    console.log(user)

    const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdChild.save({ session: sess});
        user.child.push(createdChild);
        await user.save({ session: sess});
        await sess.commitTransaction();
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdChild.save({ session: sess});
        user.child.push(createdChild);
        await user.save({ session: sess});
        await sess.commitTransaction();
    }catch (err) {
        const error = new HttpError('Regristering child failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({ child: createdChild });  
}


const getChildByUid = async (req, res, next) => {
    const Uid = req.params.uid;

    let child;
    try{
        child = await ChildModel.find({ pid: Uid});
    }catch (err) {
        const error = new HttpError(' Couldnt find the child of the given user, please try again later.', 500);
        return next(error);
    }

    if (!child || child.length === 0) {
        const error = new HttpError(' fetching child failed, please try again later.', 404);
        return next (error);
    }

    res.json({ child: child.map ( child => child.toObject({ getters: true }))});
};

const getChildByCid = async (req, res, next) => {
    const Cid = req.params.cid;

    let child;
    try{
        child = await ChildModel.findById(Cid);
    }catch (err) {
        const error = new HttpError(' Something went wrong, find child failed.', 500);
        return next(error);
    }

    if (!child) {
        const error = new HttpError(' fetching child failed, please try again later.', 404);
        return next (error);
    }

    res.json({ child: child.toObject({ getters: true })});
};

exports.registerChild = registerChild;
exports.getChildByUid = getChildByUid;
exports.getChildByCid = getChildByCid;