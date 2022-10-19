const asyncHandler = require('express-async-handler');
const Doctor = require('../model/doctorSchema');
const generateToken = require('../config/tokenGen');

const registerDoctor = asyncHandler(async (req,res)=>{
    const {name,ssfID,registrationID,mobile,adress,gender,speciality,arr} = req.body;
    if (!name||!ssfID||!registrationID||!mobile||!adress||!gender||!speciality||!arr) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    
    const isExist = await Doctor.findOne({registrationID});

    var timeAvailable = [...arr];

    if(isExist){
        res.status(400)
        throw new Error ("doctor already exist")
    }
    
    const doctor = await Doctor.create({
        name,
        ssfID,
        registrationID,
        mobile,
        adress,
        gender,
        speciality,
        timeAvailable,
    });
    
    if(doctor){
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            registrationID: doctor.registrationID,
            ssfID: doctor.ssfID,
            timeAvailable: doctor.timeAvailable,
        })
    }
    else{
        res.status(400)
        throw new Error ("failed to create a doctor")
    }

})

const authDoctor = asyncHandler(async (req,res)=>{
    const {registrationID} = req.body
    
    const doctor = await Doctor.findOne({registrationID});
    

    if(doctor){
        res.status(201).json({
            _id: doctor._id,
            ssfID: doctor.ssfID,
            registrationID: doctor.registrationID,
            timeAvailable: doctor.timeAvailable,
            token: generateToken(doctor._id)
        })
    }
    else{
        res.status(400)
        throw new Error ("invalid email or password")
    }
})

const fetchTotalDoctors = asyncHandler(async (req,res)=>{
    const count = await Doctor.countDocuments({}); 
    if(count){
        res.status(201).json({
            count:count,
        })
    }
    else{
        res.status(400)
        throw new Error("check your internet"); 
    }
})

module.exports = {registerDoctor,authDoctor,fetchTotalDoctors};
