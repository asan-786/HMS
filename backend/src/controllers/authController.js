const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const Student = require("../models/Student");


// 🔐 Generate JWT Token
const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};


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

    console.log(
   process.env.REGISTER_SECRET_KEY
);
    // ✅ Check existing user

     
    if (
            
   req.body.secretKey !==

   process.env.REGISTER_SECRET_KEY
) {

   return res.status(401).json({

      success: false,

      message: "Invalid Secret Key"
   });
}


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
      role: "student",
      rollNo,
      phone,
    });
        if (user.role === "admin") {
  return res.status(403).json({
    success: false,
    message: "Admin cannot be registered"
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






