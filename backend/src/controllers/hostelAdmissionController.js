const Student = require("../models/Student");

exports.submitAdmission = async (req, res) => {

    try {

        console.log("BODY:", req.body);

        const student = await Student.create({

            user: req.user.id,

            name: req.body.name,

            cgpa: req.body.cgpa,

            category: req.body.category,

            year: req.body.year,

            gender: req.body.gender,

            rollNo: req.body.rollNo,

            email: req.body.email,

            phone: req.body.phone,

            parentName: req.body.parentName,

            parentPhone: req.body.parentPhone,

            address: req.body.address
        });

        res.status(201).json({
            success: true,
            student
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};