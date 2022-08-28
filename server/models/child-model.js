const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const childSchema = new Schema({
    pid: { type: mongoose.Types.ObjectId, required: true, ref:'User'},
    name: { type: String, required: true},
    dob: { type:Date, required: true },
    gender: { type: String, enum:[ 'select', 'Male', 'Female'], defaule: 'select'},
    mother_tounge: { type: String},
    Grade: { type: String},
    school: { type: String},
    education: { type: String},
    school_medium: { type: String},
    relationship: { type: String},
    parents_education: { type: String},
    parents_income: { type: Number},
})

//childSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ChildModel', childSchema);