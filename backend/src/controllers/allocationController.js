const Student = require("../models/Student");
const Room = require("../models/Room");

const CATEGORY_BONUS = {

   SC: 5,
   ST: 5,
   OBC: 2,
   EWS: 3,
   General: 0
};


// ======================================================
// RUN ALLOCATION (ONLY GENERATE MERIT LIST)
// POST /api/allocation/run
// ======================================================

exports.runAllocation = async (req, res) => {

   try {

      const { cgpaWeight = 60 } = req.body;

      // ✅ Unallocated active students
      const unallocated = await Student.find({

         room: null,

         isActive: true
      });

      // ✅ Available active rooms
      const availableRooms = await Room.find({

         isActive: true

      }).then(r =>

         r.filter(x =>
            x.occupied < x.capacity
         )
      );

      // ✅ Merit score generation
      const scored = unallocated.map(s => ({

         _id: s._id,

         name: s.name,

         rollNo: s.rollNo,

         cgpa: s.cgpa,

         category: s.category,

         year: s.year,

         gender: s.gender,

         score: parseFloat(

            (
               s.cgpa * (cgpaWeight / 10)

               +

               (CATEGORY_BONUS[s.category] || 0)

            ).toFixed(2)
         ),

      }))

      .sort((a, b) => b.score - a.score);

      res.json({

         success: true,

         ranked: scored,

         availableRooms
      });

   } catch (err) {

      console.log(err);

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};


// ======================================================
// AUTO MERIT ROOM ALLOCATION
// POST /api/allocation/auto-merit
// ======================================================

exports.autoAllocateMeritRooms = async (req, res) => {

   try {

      // ✅ Students sorted by highest CGPA
      const students = await Student.find({

         room: null,

         isActive: true

      }).sort({

         cgpa: -1
      });

      // ✅ Active rooms only
      const rooms = await Room.find({

         isActive: true
      });

      let allocatedCount = 0;

      for (const student of students) {

         // ✅ Normalize student year
         const studentYear =

            student.year === 1 ||
            student.year === "1"

               ? "1st Year"

               : student.year === 2 ||
                 student.year === "2"

                  ? "2nd Year"

                  : student.year === 3 ||
                    student.year === "3"

                     ? "3rd Year"

                     : student.year === 4 ||
                       student.year === "4" ||
                       student.year === "Final Year"

                        ? "Final Year"

                        : student.year;

         // ✅ Find matching room
//          const availableRoom = rooms.find(room =>

//             room.year === studentYear &&

//             (

//    (student.gender === "Male" &&

//       room.genderType === "Boys")

//    ||

//    (student.gender === "Female" &&

//       room.genderType === "Girls")

// ) &&

//             room.occupied < room.capacity
//          );


        // ✅ Normalize gender

const gender =

   String(student.gender)

      .toLowerCase();


        console.log("================================");

console.log("STUDENT:", student.name);

console.log("YEAR:", student.year);

console.log("NORMALIZED YEAR:", studentYear);

console.log("GENDER:", student.gender);

console.log("ROOMS AVAILABLE:", rooms.length);
console.log("ROOM SAMPLE:", rooms[0]);

// ✅ Find matching room

const availableRoom = rooms.find(room =>

   room.year === studentYear

   &&

   (

      (

         ["male", "boy", "boys"]

            .includes(gender)

         &&

         room.genderType === "Boys"
      )

      ||

      (

         ["female", "girl", "girls"]

            .includes(gender)

         &&

         room.genderType === "Girls"
      )
   )

   &&

   room.occupied < room.capacity
);

     
         // ✅ Skip if no room
         if (!availableRoom) {

            continue;
         }

         // ✅ Allocate room to student
         student.room = availableRoom._id;
         student.roomName =availableRoom.roomId;

         // await student.save();

         await Student.findByIdAndUpdate(

   student._id,

   {

      room:
         availableRoom._id,

      roomName:
         availableRoom.roomId
   }
);

         // ✅ Increase occupancy
         availableRoom.occupied += 1;


         availableRoom.allocatedStudents.push(
   student._id
);
await availableRoom.save();

         // ✅ Create allocatedStudents array if missing
         if (!availableRoom.allocatedStudents) {

            availableRoom.allocatedStudents = [];
         }

         // ✅ Push student into room
         availableRoom.allocatedStudents.push(
            student._id
         );

         await availableRoom.save();

         allocatedCount++;
      }

      res.status(200).json({

         success: true,

         message:
            `${allocatedCount} students allocated automatically`
      });

   } catch (err) {

      console.log(err);

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};


// ======================================================
// MANUAL ROOM ASSIGNMENT
// POST /api/allocation/assign
// ======================================================

exports.assignRoom = async (req, res) => {

   try {

      const {
         studentId,
         roomId
      } = req.body;

      // ✅ Find room
      const room = await Room.findById(roomId);

      if (!room) {

         return res.status(404).json({

            success: false,

            message: "Room not found"
         });
      }

      // ✅ Capacity check
      if (room.occupied >= room.capacity) {

         return res.status(400).json({

            success: false,

            message: "Room is full"
         });
      }

      // ✅ Find student
      const student = await Student.findById(studentId);

      if (!student) {

         return res.status(404).json({

            success: false,

            message: "Student not found"
         });
      }

      // ✅ Already allocated check
      if (student.room) {

         return res.status(400).json({

            success: false,

            message:
               "Student already has a room"
         });
      }

      // ✅ Assign room
      student.room = room._id;

      await student.save();

      // ✅ Increase occupancy
      room.occupied += 1;

      // ✅ Add allocated students array
      if (!room.allocatedStudents) {

         room.allocatedStudents = [];
      }

      room.allocatedStudents.push(
         student._id
      );

      await room.save();

      // ✅ Return updated student
      const updated = await Student.findById(
         studentId
      ).populate("room");

      res.json({

         success: true,

         message:
            `Room ${room.roomId} allocated to ${student.name}`,

         student: updated
      });

   } catch (err) {

      console.log(err);

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};


// ======================================================
// DEALLOCATE ROOM
// POST /api/allocation/deallocate
// ======================================================

exports.deallocateRoom = async (req, res) => {

   try {

      const { studentId } = req.body;

      // ✅ Find student
      const student = await Student.findById(
         studentId
      );

      if (!student || !student.room) {

         return res.status(400).json({

            success: false,

            message:
               "Student has no room"
         });
      }

      // ✅ Find room
      const room = await Room.findById(
         student.room
      );

      if (room) {

         // ✅ Reduce occupancy
         room.occupied = Math.max(

            0,

            room.occupied - 1
         );

         // ✅ Remove student from allocated list
         room.allocatedStudents =
            room.allocatedStudents.filter(

               id =>

                  id.toString() !==
                  student._id.toString()
            );

         await room.save();
      }

      // ✅ Remove room from student
      student.room = null;

      await student.save();

      res.json({

         success: true,

         message:
            "Room deallocated successfully"
      });

   } catch (err) {

      console.log(err);

      res.status(500).json({

         success: false,

         message: err.message
      });
   }
};