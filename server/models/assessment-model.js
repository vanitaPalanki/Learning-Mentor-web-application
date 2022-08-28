const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const assessmentSchema = new Schema({
    a_name:{ type: String, required:true},
    description:{ type: String },
    a_type: { type: String, enum: [ 'Observation-base', 'Performance-base'], required: true},
    question_no: [{ type: mongoose.Types.ObjectId, ref: 'Questions'}],
});



module.exports = mongoose.model('Assessment', assessmentSchema);
