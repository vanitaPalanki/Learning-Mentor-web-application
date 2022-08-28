const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator'); 


const Schema = mongoose.Schema;
 const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String},
    utype: {type: String, required: true, enum:[ 'none', 'parent', 'consultant', 'educator', 'admin'], default: 'none ' },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 6},
    child: [{ type: mongoose.Types.ObjectId, ref: 'childModel'}],
 });

 //userSchema.plugin(uniqueValidator);

  module.exports = mongoose.model('User', userSchema);