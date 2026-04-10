// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Student = require("../models/Student");

// const signToken = (id) =>{
//  return  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
// };
// // POST /api/auth/register
// exports.register = async (req, res) => {
//   try {

//     const { name, email, password, role, rollNo, phone } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

//     const user = await User.create({ name, email, password, role: role || "student", rollNo, phone });

//     if (role !== "admin") {
//       await Student.create({
//         user: user._id, name, email, phone,
//         rollNo: rollNo || `STU${Date.now()}`,
//         cgpa: 0, category: "General",
//       });
//     }

//     const token = signToken(user._id);
//     res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // POST /api/auth/login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

//     const user = await User.findOne({ email }).select("+password");
//     if (!user || !(await user.matchPassword(password)))
//       return res.status(401).json({ success: false, message: "Invalid email or password" });

//     const token = signToken(user._id);
//     res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET /api/auth/me
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };













const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");


// 🔐 Generate JWT Token
const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// exports.register = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);

//     const { name, email, password, role } = req.body;

//     // check user exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // create user
//     const user = new User({
//       name,
//       email,
//       password,
//       role,
//     });

//     await user.save();

//     res.status(201).json({ message: "Signup successful" });

//   } catch (error) {
//     console.log("FULL ERROR:", error); // 👈 IMPORTANT
//     res.status(500).json({ message: error.message });
//   }
// };


// ================= REGISTER =================
// POST /api/auth/register
exports.register = async (req, res) => {
  try {
     
    console.log("Request Body:", req.body);
  
    const { name, email, password, role, rollNo, phone } = req.body;
     
    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // ✅ Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "student",
      rollNo,
      phone,
    });

    // ✅ Create student profile (only if student)
    if (user.role === "student") {
      await Student.create({
        user: user._id,
        name,
        email,
        phone,
        rollNo: rollNo || `STU${Date.now()}`,
        cgpa: 0,
        category: "General",
      });
    }

    // ✅ Generate token
    const token = signToken(user._id);
        await user.save();
    // ✅ Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err); 
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// // ================= LOGIN =================
// // POST /api/auth/login
exports.login = async (req, res) => {
  try {
    console.log("Login Body:", req.body); // ✅ debug
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
       return res.status(401).json({ message: "Wrong password" });
      }


    // ✅ Generate token
    const token = signToken(user._id);

    // ✅ Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
     console.log("LOGIN ERROR:", err); 
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




// ================= GET CURRENT USER =================
// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};