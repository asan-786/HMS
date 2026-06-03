// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];

//       console.log("TOKEN:", token); // ✅ debug

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("DECODED:", decoded);

//       console.log("DECODED:", decoded); // ✅ debug

//       const user = await User.findById(decoded.id);

//       console.log("DB USER:", user); // ✅ debug

//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       req.user = user;
// console.log("USER:", user);
//       next();
//     } else {
//       return res.status(401).json({ message: "No token" });
//     }

//   } catch (error) {
//     console.log("AUTH ERROR:", error.message);
//     return res.status(401).json({ message: "Token failed" });
//   }
// };



const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (
   req,
   res,
   next
) => {

   try {

      console.log(
         "HEADERS:",
         req.headers
      );

      const authHeader =
         req.headers.authorization;

      console.log(
         "AUTH HEADER:",
         authHeader
      );

      if (
         !authHeader ||

         !authHeader.startsWith("Bearer ")
      ) {

         return res.status(401).json({

            success: false,

            message: "No token provided"
         });
      }

      const token =
         authHeader.split(" ")[1];

      console.log(
         "TOKEN:",
         token
      );

      const decoded =
         jwt.verify(

            token,

            process.env.JWT_SECRET
         );

      console.log(
         "DECODED:",
         decoded
      );

      const user =
         await User.findById(decoded.id);

      console.log(
         "USER:",
         user
      );

      if (!user) {

         return res.status(401).json({

            success: false,

            message: "User not found"
         });
      }

      req.user = user;

      next();

   } catch (err) {

      console.log(
         "AUTH ERROR:",
         err.message
      );

      return res.status(401).json({

         success: false,

         message: err.message
      });
   }
};




const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only"
    });
  }
  next();
 console.log("ROLE CHECK:", req.user?.role);
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

// console.log("HEADERS:", req.headers);
// console.log(
//    "AUTH HEADER:",
//    req.headers.authorization
// );




module.exports = {
  protect,
  adminOnly,
  studentOnly,
  authorizeRoles,
  errorHandler,
};





