const HttpError = require('../models/http-error');
const { default: mongoose } = require('mongoose');

const Appointment = require('../models/appointment-model');

const createAppointment = async (req, res, next) =>{
    const { consultantId, userId, datetime } = req.body;

    const appointment = new Appointment({
        consultantId, 
        userId, 
        datetime,
        status: 'none',
        feedback: 'choose',
        consultant_note: ''
    });
    
    try{
        await appointment.save();
    }catch (err){
        const error = new HttpError(' Creating appointment failed, please try again later.', 500);
        return next (error);
    }

    res.status(201).json({ appointment: appointment.toObject({ getters: true })});
};

const getAppointment = async (req, res, next) => {
    const appointmentId = req.params.appid;

    let appointment;
    try{
        appointment = await Appointment.findById(appointmentId);
    }catch (err) {
        const error = new HttpError('could not find the desired appointment.', 500);
        return next (error);
    }

    res.json({ appointment: appointment.toObject({ getters: true})});
};

const updateAppointment = async (req, res, next) => {
    const { status, feedback, consultant_note } = req.body;
    const appointmentId = req.params.appid;
    console.log(appointmentId);
    let appointment;
    try{
        appointment = await Appointment.findById(appointmentId);
    }catch (err) {
        const error = new HttpError('Something went wrong, could not fint the appointment.', 500);
        return next( error );
    }
    console.log(appointment);
    appointment.status = status;
    appointment.feedback = feedback;
    appointment.consultant_note = consultant_note;

    try{
        await appointment.save();
    }catch (err) {
        const error = new HttpError('Something went wrong, could not update appointment.' , 500);
        return next(error);
    }

    res.status(200).json({ appointment: appointment.toObject({ getters: true})});
};

exports.createAppointment = createAppointment;
exports.getAppointment = getAppointment;
exports.updateAppointment = updateAppointment;