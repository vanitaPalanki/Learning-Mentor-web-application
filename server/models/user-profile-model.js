const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
     fname: { type: String, required: true},
     lname: { type: String, required: true},
     uid: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
     utype: {type: String, /*enum:[ 'none', 'parent', 'consultant', 'educator', 'admin'],*/ default: 'none ' },
     age: { type: Number },
     gender: { type: String, enum:[ 'select', 'Male', 'female'], default: 'select' },
     dob: { type:Date },
     guardian_name: { type: String},
     qualification: { type: String },
     user_bio: { type: String},
     Constant_no: { type: Number}, 
     profile_image: { type: String },
})

module.exports = mongoose.model('UserProfile', userProfileSchema );