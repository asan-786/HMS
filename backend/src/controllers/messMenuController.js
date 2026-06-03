// const MessMenu = require("../models/MessMenu");

// exports.createMenu = async (req,res)=>{
//     try{
//         const menu = new MessMenu(req.body);
//         await menu.save();
//         res.status(201).json(menu);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };

// exports.getMenu = async (req,res)=>{
//     try{
//         const menu = await MessMenu.find();
//         res.json(menu);
//     }
//     catch(error){
//         res.status(500).json(error);
//     }
// };





const MessMenu = require("../models/MessMenu");
const Student = require("../models/Student");

// GET /api/mess/menu
// exports.getMenu = async (req, res) => {
//   try {
//     const menu = await MessMenu.find().sort("day");
//     res.json({ success: true, menu });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

exports.getMenu = async (req, res) => {
  try {
    const { gender, year } = req.query;
       console.log("QUERY:", req.query);
    const menu = await MessMenu.findOne({ gender, year });
   console.log("FOUND MENU:", menu);
    if (!menu) {
      return res.json({ success: true, menu: {} }); // ✅ avoid crash
    }

    // 🔥 REMOVE unwanted fields
    const { _id, gender: g, year: y, __v, ...menuData } = menu.toObject();

    res.json({
      success: true,
      menu: menuData   // ✅ ONLY days data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// PUT /api/mess/menu/:day  (admin)
// exports.updateMenuItem = async (req, res) => {
//   try {
//     const { day } = req.params;
//     const item = await MessMenu.findOneAndUpdate(
//       { day },
//       { ...req.body, updatedBy: req.user.id },
//       { new: true, upsert: true }
//     );
//     res.json({ success: true, item });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// exports.updateMenuItem = async (req, res) => {
//   try {
//     const { day } = req.params;
//     const { gender, year, breakfast, lunch, dinner } = req.body;

//     // 🔥 update inside document
//     const updatedMenu = await MessMenu.findOneAndUpdate(
//       { gender, year },
//       {
//         $set: {
//           [`${day}.breakfast`]: breakfast,
//           [`${day}.lunch`]: lunch,
//           [`${day}.dinner`]: dinner
//         }
//       },
//       { new: true, upsert: true }
//     );

//     res.json({ success: true, menu: updatedMenu });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };



// exports.updateMenuItem = async (req, res) => {
//   try {
    

//     const { day } = req.params;
//     const { gender, year, breakfast, lunch, dinner } = req.body;
//     console.log("🔥 API HIT");
//     console.log("DAY:", req.params.day);
//     console.log("BODY:", req.body);

//     if (!gender || !year) {
//       return res.status(400).json({
//         success: false,
//         message: "Gender and Year required"
//       });
//     }

//     let menu = await MessMenu.findOne({ gender, year });

//     if (!menu) {
//       console.log("🆕 Creating new menu");
//       menu = new MessMenu({ gender, year });
//     }

//     // ✅ VERY IMPORTANT FIX
//     menu[day] = {
//       breakfast: breakfast || "",
//       lunch: lunch || "",
//       dinner: dinner || ""
//     };

//     await menu.save();

//     console.log("✅ SAVED:", menu);

//     res.json({ success: true, menu });

//   } catch (err) {
//     console.error("❌ ERROR:", err);   // 👈 FULL ERROR
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };


exports.updateMenuItem = async (req, res) => {
  try {
    const { day } = req.params;
    const { gender, year, breakfast, lunch, dinner } = req.body;

    console.log("🔥 API HIT");
    console.log("DAY:", day);
    console.log("BODY:", req.body);

    // ✅ FIND existing document
    let menu = await MessMenu.findOne({ gender, year });

    if (!menu) {
      // ✅ CREATE new document
      menu = new MessMenu({
        gender,
        year
      });
    }

    // ✅ SET DAY DATA
    menu[day] = {
      breakfast,
      lunch,
      dinner
    };

    await menu.save();

    res.json({
      success: true,
      menu
    });

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// POST /api/mess/enroll  (student)
exports.enrollMess = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user.id },
      { messEnrolled: true },
      { new: true }
    );
    res.json({ success: true, message: "Enrolled in mess successfully", student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/mess/unenroll  (student)
exports.unenrollMess = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user.id },
      { messEnrolled: false },
      { new: true }
    );
    res.json({ success: true, message: "Unenrolled from mess", student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};