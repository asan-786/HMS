
// const connectDB = require("./config/db");

// const studentRoutes = require("./routes/studentRoutes");
// const complaintRoutes = require("./routes/complaintRoutes");
// const feeRoutes = require("./routes/feeRoutes");
// const roomRoutes = require("./routes/roomRoutes");
// const messMenuRoutes = require("./routes/messMenuRoutes");
// const noticeRoutes = require("./routes/noticeRoutes");

// const app = express();

// app.use(express.json());

// connectDB();

// app.use("/api/students", studentRoutes);
// app.use("/api/complaints", complaintRoutes);
// app.use("/api/fees", feeRoutes);
// app.use("/api/rooms", roomRoutes);
// app.use("/api/menu", messMenuRoutes);
// app.use("/api/notices", noticeRoutes);

// app.listen(5000,()=>{
//     console.log("Server running on port 5000");
// });









// const dotenv = require("dotenv");
require("dotenv").config({ path: "../.env" });
// dotenv.config();
const express = require("express");
const cors = require("cors");
// const morgan =require("morgan");

const connectDB=require("./config/db");
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// app.use(morgan("dev"));
// app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
console.log("auth loaded");

// app.use("/api/student", require("./routes/studentRoutes"));
// console.log("student loaded");

// app.use("/api/room", require("./routes/roomRoutes"));
// console.log("room loaded");

// app.use("/api/complaint", require("./routes/complaintRoutes"));
// console.log("complaint loaded");

// app.use("/api/notice", require("./routes/noticeRoutes"));
// console.log("notice loaded");

// app.use("/api/mess", require("./routes/messMenuRoutes"));
// console.log("mess loaded");

// app.use("/api/fee", require("./routes/feeRoutes"));
// console.log("fee loaded");

// app.use("/api/allocation", require("./routes/allocationRoutes"));
// console.log("allocation loaded");


// app.get("/api/health", (req, res) => res.json({ status: "OK", message: "HostelOS API running" }));

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));