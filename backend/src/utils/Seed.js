const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User");
const Student = require("../models/Student");
const Room = require("../models/Room");
const MessMenu = require("../models/MessMenu");
const Notice = require("../models/Notice");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Clear
  await Promise.all([User.deleteMany(), Student.deleteMany(), Room.deleteMany(), MessMenu.deleteMany(), Notice.deleteMany()]);

  // Admin
  const admin = await User.create({ name: "Dr. Rajesh Kumar", email: "admin@hostel.edu", password: "admin123", role: "admin" });

  // Students
  const studentData = [
    { name: "Arjun Sharma",  rollNo: "CS21001", cgpa: 9.2, category: "General", email: "arjun@college.edu",  phone: "9876543210" },
    { name: "Priya Patel",   rollNo: "EC21045", cgpa: 8.7, category: "OBC",     email: "priya@college.edu",  phone: "9876543211" },
    { name: "Ravi Kumar",    rollNo: "ME21023", cgpa: 7.5, category: "SC",      email: "ravi@college.edu",   phone: "9876543212" },
    { name: "Sneha Singh",   rollNo: "CS21056", cgpa: 8.9, category: "General", email: "sneha@college.edu",  phone: "9876543213" },
    { name: "Amit Verma",    rollNo: "CE21078", cgpa: 6.8, category: "ST",      email: "amit@college.edu",   phone: "9876543214" },
  ];

  for (const s of studentData) {
    const user = await User.create({ name: s.name, email: s.email, password: "student123", role: "student" });
    await Student.create({ ...s, user: user._id, messEnrolled: s.cgpa > 8, feesPaid: s.cgpa > 8 });
  }

  // Rooms
  await Room.insertMany([
    { roomId: "A-101", block: "A", floor: 1, capacity: 2, occupied: 1, type: "Double",  amenities: ["AC", "Attached Bath"] },
    { roomId: "A-102", block: "A", floor: 1, capacity: 2, occupied: 1, type: "Double",  amenities: ["AC", "Attached Bath"] },
    { roomId: "A-201", block: "A", floor: 2, capacity: 1, occupied: 0, type: "Single",  amenities: ["AC", "Common Bath"] },
    { roomId: "B-101", block: "B", floor: 1, capacity: 3, occupied: 0, type: "Triple",  amenities: ["Fan", "Common Bath"] },
    { roomId: "B-203", block: "B", floor: 2, capacity: 2, occupied: 1, type: "Double",  amenities: ["Fan", "Attached Bath"] },
    { roomId: "C-301", block: "C", floor: 3, capacity: 1, occupied: 0, type: "Single",  amenities: ["AC", "Attached Bath"] },
  ]);

  // Mess Menu
  const menu = [
    { day: "Monday",    breakfast: "Poha, Chai, Fruit",         lunch: "Dal, Rice, Sabzi, Roti",       dinner: "Paneer, Rice, Roti, Salad" },
    { day: "Tuesday",   breakfast: "Idli, Sambar, Chutney",     lunch: "Rajma, Rice, Roti",            dinner: "Mix Veg, Dal, Rice, Roti" },
    { day: "Wednesday", breakfast: "Paratha, Curd, Pickle",     lunch: "Chole, Rice, Roti",            dinner: "Egg Curry, Rice, Roti, Salad" },
    { day: "Thursday",  breakfast: "Upma, Chai, Banana",        lunch: "Dal Fry, Rice, Sabzi, Roti",   dinner: "Chicken Curry, Rice, Roti" },
    { day: "Friday",    breakfast: "Bread, Butter, Jam, Milk",  lunch: "Kadhi, Rice, Roti",            dinner: "Paneer Masala, Dal, Rice, Roti" },
    { day: "Saturday",  breakfast: "Poori, Aloo Sabzi",         lunch: "Biryani, Raita, Salad",        dinner: "Dal Makhani, Roti, Rice" },
    { day: "Sunday",    breakfast: "Dosa, Sambar, Chutney",     lunch: "Special Thali",                dinner: "Kheer, Puri, Sabzi, Dal" },
  ];
  await MessMenu.insertMany(menu.map(m => ({ ...m, updatedBy: admin._id })));

  // Notices
  await Notice.insertMany([
    { title: "Hostel Day Celebration", content: "Annual Hostel Day on March 15.", important: true, postedBy: admin._id },
    { title: "Mess Fee Deadline",      content: "Last date to pay mess fees is Feb 28.", important: true, postedBy: admin._id },
    { title: "Water Supply Disruption",content: "Water off Feb 26 from 10AM–2PM.", important: false, postedBy: admin._id },
  ]);

  console.log("Seed complete!");
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });