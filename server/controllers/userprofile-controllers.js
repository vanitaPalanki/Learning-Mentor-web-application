const { validationResult } = require( 'express-validator' );

const HttpError = require('../models/http-error');
 const UserProfile = require('../models/user-profile-model');

 const getUserProfileByUid = async (req, res, next) => {
    const userId  = req.params.uid;
    console.log(userId);
    
    //  const userProfile =  await UserProfile.find({ uid: userId});
    let userProfile;
    try {
        userProfile =  await UserProfile.find({ uid: userId});
    }catch(err){
        const error = new HttpError( 'Fetching userprofile failed, pleasetry again later', 500);
        return next(error);
    }

    if (!userProfile || userProfile.length === 0) {
        const error = new HttpError(' could not find the profile for the provided user id.',404);
        return next(error);
    }
     res.json({ userProfile: userProfile.map(userProfile => userProfile.toObject({ getters: true})) });
}; 

const getUserProfileById = async (req, res, next) => {
    const userProfileId = req.params.pid;

    let userProfile;
    try{
        userProfile = await UserProfile.findById(userProfileId);
    }catch (err) {
        const error = new HttpError(' Something went wrong could not find the userproflie.', 500);
        return next(error);
    }
    

    if (!userProfile) {
        const error = new HttpError('Colud not find a userprofile for the provides id.', 404);
        return next(error);
    }

    res.json({ userProfile: userProfile.toObject( {getters: true} )});
}

const updateUserProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError (' Invalid inputs Passed, please check your data.', 422);
    }

    const { age, gender, dob, guardian_name, qualification, user_bio, Constant_no, profile_image } = req.body;
    const userProfileId = req.params.pid;

    let userprofile;
    try{
        userprofile = await UserProfile.findById(userProfileId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update user profile', 500);
        return next( error );
    }

    userprofile.age = age;
    userprofile.gender = gender;
    userprofile.dob = dob;
    userprofile.guardian_name = guardian_name;
    userprofile.qualification = qualification;
    userprofile.user_bio = user_bio;
    userprofile.Constant_no = Constant_no;
    userprofile.profile_image = profile_image;
    
    //await userprofile.save();
    try {
        await userprofile.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update user profile.' , 500);
        return next(error);
    }

    res.status(200).json({userprofile: userprofile.toObject({ getters: true})});
};
 


exports.getUserProfileById = getUserProfileById;
exports.getUserProfileByUid = getUserProfileByUid;
exports.updateUserProfile = updateUserProfile; 