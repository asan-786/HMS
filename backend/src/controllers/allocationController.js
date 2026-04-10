const Student = require("../models/Student");
const Room = require("../models/Room");

const CATEGORY_BONUS = { SC: 5, ST: 5, OBC: 2, EWS: 3, General: 0 };

// POST /api/allocation/run  (admin - returns ranked list, no DB changes)
exports.runAllocation = async (req, res) => {
  try {
    const { cgpaWeight = 60 } = req.body;
    const unallocated = await Student.find({ room: null, isActive: true });
    const availableRooms = await Room.find({ isActive: true }).then(r => r.filter(x => x.occupied < x.capacity));

    const scored = unallocated.map(s => ({
      _id: s._id,
      name: s.name,
      rollNo: s.rollNo,
      cgpa: s.cgpa,
      category: s.category,
      score: parseFloat((s.cgpa * (cgpaWeight / 10) + (CATEGORY_BONUS[s.category] || 0)).toFixed(2)),
    })).sort((a, b) => b.score - a.score);

    res.json({ success: true, ranked: scored, availableRooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/allocation/assign  (admin - actually allocates)
exports.assignRoom = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    if (room.occupied >= room.capacity) return res.status(400).json({ success: false, message: "Room is full" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    if (student.room) return res.status(400).json({ success: false, message: "Student already has a room" });

    // Assign
    student.room = room._id;
    await student.save();

    room.occupied += 1;
    await room.save();

    const updated = await Student.findById(studentId).populate("room");
    res.json({ success: true, message: `Room ${room.roomId} allocated to ${student.name}`, student: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/allocation/deallocate  (admin)
exports.deallocateRoom = async (req, res) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findById(studentId);
    if (!student || !student.room) return res.status(400).json({ success: false, message: "Student has no room" });

    const room = await Room.findById(student.room);
    if (room) { room.occupied = Math.max(0, room.occupied - 1); await room.save(); }

    student.room = null;
    await student.save();
    res.json({ success: true, message: "Room deallocated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};