const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const userRouter = require('./routes/user');
const userProfile = require('./routes/user_profile');
const childRouter = require('./routes/child');
const adminRouter = require('./routes/admin');
const appointmentRouter = require('./routes/appointment');

const app = express();

app.use(bodyParser.json());


app.use('/api/users', userRouter);
app.use('/api/userprofile', userProfile);
app.use('/api/child', childRouter);
app.use('/api/admin', adminRouter);
app.use('/api/appointment', appointmentRouter);

mongoose
    .connect('mongodb+srv://vanita:Onlyme000@cluster0.rduik.mongodb.net/usersdb?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
        console.log('sucessfully connected');
    }) 
    .catch(err => {
        console.log(err);
    });

