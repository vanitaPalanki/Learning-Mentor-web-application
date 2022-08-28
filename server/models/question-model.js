const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    aid: { type: mongoose.Types.ObjectId, ref: 'Assessment'},
    question:{ type: String },
});


module.exports = mongoose.model('Questions', questionSchema);