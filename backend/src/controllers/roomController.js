// const RoomAllocation = require("../models/RoomAllocation");

// exports.allocateRoom = async (req,res)=>{
//     try{
//         const room = new RoomAllocation(req.body);
//         await room.save();
//         res.status(201).json(room);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getRooms = async (req,res)=>{
//     try{
//         const rooms = await RoomAllocation.find().populate("student");
//         res.json(rooms);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };



const Room = require("../models/Room");
const Student = require("../models/Student");

// GET /api/rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true });
    // Attach residents
    const enriched = await Promise.all(rooms.map(async (r) => {
      const residents = await Student.find({ room: r._id, isActive: true }, "name rollNo cgpa");
      return { ...r.toObject(), residents };
    }));
    res.json({ success: true, rooms: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/rooms/available
exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true }).where("occupied").lt(mongoose.Types.Decimal128);
    // simpler:
    const all = await Room.find({ isActive: true });
    const available = all.filter(r => r.occupied < r.capacity);
    res.json({ success: true, rooms: available });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/rooms/:id
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    const residents = await Student.find({ room: room._id }, "name rollNo cgpa category");
    res.json({ success: true, room: { ...room.toObject(), residents } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/rooms  (admin)
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/rooms/:id  (admin)
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};