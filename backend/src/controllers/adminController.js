const Admin = require("../models/Admin");

exports.createAdmin = async (req,res)=>{
    try{
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    }
    catch(error){
        res.status(500).json(error);
    }
};

exports.getAdmins = async (req,res)=>{
    try{
        const admins = await Admin.find();
        res.json(admins);
    }
    catch(error){
        res.status(500).json(error);
    }
};