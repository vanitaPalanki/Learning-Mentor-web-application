 const { validationResult } = require('express-validator');
 
 const getConsultant = async (req, res, next) => {
    const userType = req.params.utype;
    console.log(userType);
     let user;
     user = await User.find( {utype: userType});
     /*try{
        user = await User.find( userType);
     }catch (err) {
        const error = new HttpError(' Something went wrong, please try again later.', 500);
        return next (error);
     }*/

     if(!user){
        const error = new HttpError(' Could not find consultant, please try again later.', 404);
        return next (error); 
     }
     console.log(user);
     res.json({ user: user.map(user => user.toObject({ getters: true}))});

 };

 const HttpError = require('../models/http-error');
 const User = require('../models/user-model');
const UserProfile = require('../models/user-profile-model');

 const signup = async (req, res, next) => {
     const errors = validationResult(req);
     console.log(errors);
     if(!errors.isEmpty()){
         return next(
             new HttpError('Invalid inputs passed, please check your data.', 422)
         );
     }
     const { first_name, last_name, utype, email, password } = req.body;

     let existingUser
     try{
         existingUser = await User.findOne({ email: email})
     }catch (err) {
         const error = new HttpError('Signing up failed, please try again later.', 500);
         return next(error);
     }
     
     if (existingUser) {
        const error = new HttpError('User exists already, please login instead.', 422);
        return next(error);
    }  
     
     const createdUser = new User({
        first_name, 
        last_name, 
        utype, 
        email, 
        password,
        child:[]
     });

     try {
         await createdUser.save();
     } catch (err){
         const error = new HttpError('Signing up failed, please try again.', 500);
         return next(error);
     }
     const userId = createdUser._id.toString();
         console.log(userId);
     
   const createdUserProfile = new UserProfile({
         fname: first_name,
         lname: last_name,
         uid: userId,
         utype,
         age: '',
         gender: 'select',
         dob: '',
         guardian_name: '',
         qualification: '',
         user_bio: '',
         Constant_no: '',
         profile_image: '',
         
    });
    await createdUserProfile.save(); 
     /*try{
         await createdUserProfile.save();
     }catch (err){
         const error = new HttpError('creating the profile failed, please try agiain.', 500);
         return next(error);
     }*/
     res.status(201).json({ user: createdUser.toObject({ getters: true}), userprofiles:createdUserProfile.toObject({ getters: true})  });
};

 const login = async (req, res, next) => {
     const { email, password } = req.body;
     try{
         existingUser = await User.findOne({ email: email })
     }catch (err) {
         const error = new HttpError(' Logging in failed, please try again later.', 500);
         return next(error);
     }

     if (!existingUser || existingUser.password !== password){
         const error = new HttpError('Invalid credentials, could not log you in.', 401);
         return next(error);
     }

     res.json({message: 'logged in!'});
 }; 

 exports.getConsultant = getConsultant;
 exports.signup = signup;
 exports.login = login; 