const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
    consultantId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    datetime: { type: Date},
    status: { type: String, enum:[ 'none', 'taken', 'cancled'], default: 'none' },
    feedback: { type: String, enum: [ 'choose', 'very good', 'good', 'average', 'bad', 'very bad'], default: 'choose'},
    consultant_note: {type: String},
})

module.exports = mongoose.model('AppointmentSchema', appointmentSchema);
