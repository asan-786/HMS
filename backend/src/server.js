// const dotenv = require("dotenv");
require("dotenv").config({ path: "../.env" });
// dotenv.config();
const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Room = require("./models/Room");
const {mockRooms} = require("./data/mockData");
// const morgan =require("morgan");
const hostelAdmissionRoutes = require("./routes/hostelAdmissionRoutes");

const connectDB=require("./config/db");
connectDB();

const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json());


const createAdmin = async () => {
  const adminExists = await User.findOne({ email: "admin@hostel.com" });

  if (!adminExists) {
    await User.create({
      name: "Admin",
      email: "admin@hostel.com",
      password: "admin123",
      role: "admin"
    });
    console.log("✅ Admin created");
  }
};

createAdmin();

const createDefaultRooms = async () => {

   try {
      console.log(mockRooms.length);

      const roomExists =
         await Room.findOne();

      // ✅ Prevent duplicate insert
      if (roomExists) {

         console.log(
            "Rooms already exist"
         );

         return;
      }
    console.log(mockRooms[0]);
      // ✅ Insert rooms
      await Room.insertMany(
         mockRooms
      );

      console.log(
         "✅ Mock rooms inserted"
      );

   } catch (err) {

      console.log(
         "ROOM INSERT ERROR:",
         err
      );
   }
};

createDefaultRooms();
// app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", require("./routes/authRoutes"));
console.log("auth loaded");

app.use("/api/student", require("./routes/studentRoutes"));
console.log("student loaded");
app.use(
   "/api/verification",
   require("./routes/verificationRoutes")
);

app.use(                                                      "/api/allocation",require("./routes/allocationRoutes"));

app.use("/api/room", require("./routes/roomRoutes"));
console.log("room loaded");

app.use("/api/admission",hostelAdmissionRoutes); 
console.log("hostel admission loaded");

app.use("/api/complaint", require("./routes/complaintRoutes"));
console.log("complaint loaded");

app.use("/api/notices", require("./routes/noticeRoutes"));
console.log("notice loaded");

app.use("/api/mess", require("./routes/messMenuRoutes"));
console.log("mess loaded");

app.use("/api/fee", require("./routes/feeRoutes"));
console.log("fee loaded");

app.use("/api/allocation", require("./routes/allocationRoutes"));
console.log("allocation loaded");


app.get("/api/health", (req, res) => res.json({ status: "OK", message: "HostelOS API running" }));

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));