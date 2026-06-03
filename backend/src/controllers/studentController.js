const Student = require("../models/Student");
const Room = require("../models/Room");
const VerifiedStudent = require(
   "../models/VerifiedStudent"
);

// GET /api/students  (admin only)
exports.getAllStudents = async (req, res) => {

   try {

      const students = await Student.find({
         isActive: true
      })

      .populate({
         path: "room",
         select:
            "roomId block floor type capacity occupied"
      });

      console.log(
         "POPULATED STUDENTS:",
         students
      );

      res.json({

         success: true,

         count: students.length,

         students
      });

   } catch (err) {

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};


// exports.createAdmission = async (req, res) => {

//     try {
//           console.log("REQ USER:", req.user);
//            console.log("REQ BODY:", req.body);

//       const verified =
//    await VerifiedStudent.findOne({

//       rollNumber: req.body.rollNumber
//    });

// if (!verified) {

//    return res.status(401).json({

//       success: false,

//       message:
//          "Roll number not authorized"
//    });
// }

// if (verified.isUsed) {

//    return res.status(400).json({

//       success: false,

//       message:
//          "Roll number already used"
//    });
// }

// verified.isUsed = true;

// await verified.save();           
     
//         const student = await Student.create({

//             user: req.user.id,

//             name: req.body.name,

//             rollNo:
//                 "STU" + Date.now(),

//             cgpa: req.body.cgpa,

//             category: req.body.category,

//             year: req.body.year,

//             gender: req.body.gender,

//             phone: req.body.phone,

//             parentName: req.body.parentName,

//             parentPhone: req.body.parentPhone,

//             address: req.body.address,

//             email: req.user.email
//         });

//         res.status(201).json({

//             success: true,

//             student
//         });

//     } catch (err) {

//          console.log("ADMISSION ERROR:", err);

//         res.status(500).json({

//             success: false,

//             message: err.message
//         });
//     }
// };



 exports.createAdmission = async (req, res) => {

   try {

      console.log(
         "REQ USER:",
         req.user
      );

      console.log(
         "REQ BODY:",
         req.body
      );

      // ✅ Verify roll number

      const verified =
         await VerifiedStudent.findOne({

            rollNumber:
               req.body.rollNumber
         });

     // ❌ Roll number not uploaded by admin

if (!verified) {

   return res.status(400).json({

      success: false,

      message:
         "Roll number not verified by admin"
   });
}

// ❌ Roll number already used

if (verified.isUsed) {

   return res.status(400).json({

      success: false,

      message:
         "Roll number already used"
   });
}

// ✅ Mark roll number as used

verified.isUsed = true;

await verified.save();

      // ✅ Create student admission

      const student =
         await Student.create({

            user: req.user.id,

            name: req.body.name,

            // ✅ Save original college roll number

            rollNo:
               req.body.rollNumber,

            cgpa:
               req.body.cgpa,

            category:
               req.body.category,


            year:
               req.body.year,

            gender:
               req.body.gender,

            phone:
               req.body.phone,

            parentName:
               req.body.parentName,

            parentPhone:
               req.body.parentPhone,

               guardianName:
           req.body.guardianName,

          guardianPhone:
          req.body.guardianPhone, 

            address:
               req.body.address,

            email:
               req.user.email
         });

      res.status(201).json({

         success: true,

         student
      });

   } catch (err) {

      console.log(
         "ADMISSION ERROR:",
         err
      );

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};



// GET /api/students/me  (logged-in student)
exports.getMyProfile = async (req, res) => {

   try {

      const student = await Student.findOne({

         user: req.user.id

      }).populate({

         path: "room",

         select:
            "roomId block floor type capacity occupied"
      });

      if (!student) {

         return res.status(404).json({

            success: false,

            message: "Student profile not found"
         });
      }

      res.json({

         success: true,

         student
      });

   } catch (err) {

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};

// GET /api/students/:id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("room", "roomId block");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/students/me  (student updates own profile)
exports.updateMyProfile = async (req, res) => {
  try {
    const allowed = ["phone", "parentName", "parentPhone", "address", "cgpa"];
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
    const student = await StudentOneAndUpdate({ user: req.user.id }, updates, { new: true });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/students/:id  (admin updates any student)
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/students/:id (admin)
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: "Student deactivated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};