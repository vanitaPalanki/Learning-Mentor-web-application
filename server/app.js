const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const userRouter = require('./routes/user');
const userProfile = require('./routes/user_profile');
const childRouter = require('./routes/child');
const adminRouter = require('./routes/admin');
const appointmentRouter = require('./routes/appointment');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());


app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next ();
}); 

app.use('/api/users', userRouter);
app.use('/api/userprofile', userProfile);
app.use('/api/child', childRouter);
app.use('/api/admin', adminRouter);
app.use('/api/appointment', appointmentRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find the route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An Unknown error occured!' });
});

mongoose
    .connect('mongodb+srv://vanita:Onlyme000@cluster0.rduik.mongodb.net/mern?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
        console.log('sucessfully connected');
    }) 
    .catch(err => {
        console.log(err);
    });

