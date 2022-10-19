const asyncHandler = require('express-async-handler');
const Patient = require('../model/patientSchema');
const Family = require('../model/familySchema');

const fetchPatient = asyncHandler(async (req,res)=>{
    const {regId} = req.body;
    const fId = regId.substring(0,regId.length-2);
    const family = await Family.findOne({id:fId});
    var mem = family.members.filter((item)=>{
        return item.id == regId
    })
    if(!mem[0]){
        mem = family.additionalMembers.filter((item)=>{
            return item.id == regId
        })
    }
    if(mem[0]){
        const listPatient = await Patient.find({registrationP:regId})
        var count = listPatient.length;
        var number="";
        if(count+1<10){
            number = "000" + (count+1);
        }
        else if(count+1<100){
            number = "00"+(count+1);
        }
        else if(count+1<1000){
            number = '0'+(count+1);
        }
        else{
            number = (count+1)+"";
        }
        const ticket = mem[0].id + number+ "";
        res.status(201).json({
            registrationP: mem[0].id,
            registrationNumber:fId,
            name:mem[0].name,
            ticketId:ticket,
            relationship:mem[0].relationship,
        })
    }
})

const addPatient = asyncHandler(async(req,res)=>{
    const {marital,DOB,education,profession,height,weight,temperature,pulse,sbp,dbp,alcohol,asthama,diabetes,familyIll,smoking,spo2,admitted,currentMed,healthCondition,injuries,pastDiseases,abortion,numberOfChild,otherComplications,totalPregnancies,others,otherHistory,patientData,mobile,gender} = req.body;
    const medical={
        height:height,
        weight:weight,
        temperature:temperature,
        pulse:pulse,
        sbp:sbp,
        dbp:dbp,
        alcohol:alcohol,
        asthama:asthama,
        diabetes:diabetes,
        familyIll:familyIll,
        smoking:smoking,
        spo2:spo2,
        others:others,
    };
    const pastHistory={
        admitted:admitted,
        currentMed:currentMed,
        healthCondition:healthCondition,
        injuries:injuries,
        otherHistory:otherHistory,
        pastDiseases:pastDiseases,
    };
    const gynocoligical={
        abortion:abortion,
        numberOfChild:numberOfChild,
        otherComplications:otherComplications,
        totalPregnancies:totalPregnancies,
    };
    const patient = await Patient.create({
        patientData,
        marital,
        gender,
        DOB,
        education,
        profession,
        mobile,
        medical,
        pastHistory,
        gynocoligical
    });
    if(patient){
        res.status(201).json(patient);
    }
})

const appointedPatients = asyncHandler(async (req,res)=>{
    const {from,to} = req.body;
    var [day,month,year] = from.split('/');
    const start = new Date(year,month-1,day)
    var [day,month,year] = to.split('/');
    const end = new Date(year,month-1,day)
    const patients = await Patient.find({
        appointedTime:{$gte:start},
    }).find({
        appointedTime:{$lte:end},
    })
    if(patients){
        res.status(201).json(patients);
    }
    else{
        res.status(400)
        throw new Error ("Error")
    }
    
})

const setAppointedDate = asyncHandler(async (req,res)=>{
    const {date,id,doctor} = req.body;
    const [day,month,year] = date.split('/');
    const appointedDate = new Date(year,month - 1,day);
    const patient = await Patient.updateOne({'patientData.ticketId':id},{appointedTime:appointedDate,doctor:doctor})
    if(patient){
        const updated = await Patient.findOne({'patientData.ticketId':id})
        res.status(201).json(updated);
    }
    else{
        res.status(400)
        throw new Error ("Error")
    }
})

const fetchAll = asyncHandler(async (req,res)=>{
    const patients = await Patient.find({doctor:"0"})
    if(patients){
        res.status(201).json(patients)
    }
})

module.exports = {fetchPatient,addPatient,appointedPatients,setAppointedDate,fetchAll};
