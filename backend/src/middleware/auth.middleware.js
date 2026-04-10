// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");



// // const protect = async (req, res, next) => {
// //   let token;

// //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// //     token = req.headers.authorization.split(" ")[1];
// //   }

// //   if (!token) {
// //     return res.status(401).json({ success: false, message: "Not authorized, no token" });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     req.user = await User.findById(decoded.id).select("-password");

// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ success: false, message: "Token invalid or expired" });
// //   }
// // };

// // const adminOnly = (req, res, next) => {
// //   if (req.user && req.user.role === "admin") {
// //     return next();
// //   }

// //   return res.status(403).json({ success: false, message: "Admin access only" });
// // };

// // module.exports = { protect, adminOnly };












// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     next(); // move to next middleware/route
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Token invalid or expired" });
//   }
// };

// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({ success: false, message: "Admin access only" });
// };

// module.exports = { protect, adminOnly };







const jwt = require("jsonwebtoken");
const User = require("../models/User");


// 🔐 1. PROTECT (Check Login)
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};



// 🔐 2. ADMIN ONLY
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access only",
  });
};



// 🔐 3. STUDENT ONLY
const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Student access only",
  });
};



// 🔐 4. ROLE BASED (Flexible)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Allowed roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
};



// 🔐 5. OPTIONAL: GLOBAL ERROR HANDLER (for controllers)
const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};



module.exports = {
  protect,
  adminOnly,
  studentOnly,
  authorizeRoles,
  errorHandler,
};