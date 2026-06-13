/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {initialHostels,mockRooms} from "../data/mockData";


const HostelContext = createContext();

export const useHostel = () => useContext(HostelContext);

// ✅ Axios instance (no need to repeat headers everywhere)
const API = axios.create({
    baseURL: "https://hms-w6eu.onrender.com/api"
});

// ✅ Add token automatically in every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const HostelProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [hostels, setHostels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [notices, setNotices] = useState([]);
    const [messMenu, setMessMenu] = useState([]);
    const [studentProfile, setStudentProfile] =useState(null);
    const [feeConfig, setFeeConfig] = useState({
        singleRoomHostel: 13000,
        standardRoomHostel: 12000,
        girlsMess: 18500,
        boysMess: 17500
    });


const fetchData = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const user = JSON.parse(localStorage.getItem("user"));

        // ✅ prepare API calls
        const requests = [
            API.get("/room"),
            API.get("/mess", {
                params: {
                    gender: user?.gender || "Boys",
                    year: user?.year || "1st Year"
                }
            }),
            API.get("/complaint"),
            API.get("/notices")
        ];

        // ✅ only admin gets students
        if (user?.role === "admin") {
            requests.unshift(API.get("/student"));
        }

        const responses = await Promise.all(requests);

        let index = 0;

      
 
       if (user?.role === "admin") {

    const studentsRes = responses[index++];

    console.log("STUDENT RESPONSE:", studentsRes.data);

    const allStudents =
        studentsRes.data.students ||
        studentsRes.data ||
        [];

    setStudents(allStudents);

    console.log("FINAL STUDENTS:", allStudents);
}



        const roomsRes = responses[index++];



   let backendRooms = [];

try {

    backendRooms =
        Array.isArray(roomsRes.data)
            ? roomsRes.data
            : roomsRes.data.rooms || [];

} catch (err) {

    console.log("ROOM API FAILED");
}

console.log("BACKEND ROOMS:", backendRooms);

if (backendRooms && backendRooms.length > 0) {

    setRooms(backendRooms);

} else {

    console.log("USING MOCK ROOMS");

    setRooms(mockRooms);
}


//      const profileRes =
//     await API.get("/student/me");

// console.log(
//    "PROFILE:",
//    profileRes.data.student
// );

// setStudentProfile(
//    profileRes.data.student
// );


if (user?.role === "student") {

    try {

        const profileRes =
            await API.get("/student/me");

        console.log(
            "PROFILE:",
            profileRes.data.student
        );

        setStudentProfile(
            profileRes.data.student
        );

    } catch (err) {

        console.log(
            "Student profile not found"
        );
    }
}


        // ✅ ✅ FIXED MESS MENU
        const messRes = responses[index++];
      setMessMenu(messRes.data.menu || {});

// setMessMenu(menuData); // 🔥 IMPORTANT FIX
        //  console.log("FINAL MENU:", menuData);
        console.log("MESS DATA:", messRes.data);
        console.log("MENU ONLY:", messRes.data.menu);

        // ✅ complaints
        const compRes = responses[index++];
        setComplaints(
            Array.isArray(compRes.data)
                ? compRes.data
                : compRes.data.complaints || []
        );

        // ✅ notices
        const notRes = responses[index++];
        setNotices(
            Array.isArray(notRes.data)
                ? notRes.data
                : notRes.data.notices || []
        );

        console.log("FETCH SUCCESS");

    } catch (error) {
        console.error("Error fetching hostel data:", error.response || error.message);
    }
};

    useEffect(() => {
        fetchData();
    }, []);

    const updateFeeConfig = (newConfig) => {
        setFeeConfig(prev => ({ ...prev, ...newConfig }));
    };


    const deleteNotice = async (id) => {

   try {

      await API.delete(`/notices/${id}`);

      setNotices(prev =>
         prev.filter(notice => notice._id !== id)
      );

   } catch (err) {

      console.log(err);
   }
};
    const updateMessMenu = async (gender, year, updatedMenu) => {
        try {
            for (const [day, meals] of Object.entries(updatedMenu)) {
                await API.put(`/mess/menu/${day}`, {
                    gender,
                    year,
                    day,
                    ...meals
                });
            }
            fetchData();
        } catch (error) {
            console.error("Error updating mess menu:", error);
        }
    };

    const updateHostelConfig = (updatedHostels) => {
        setHostels(updatedHostels);
    };




//     const autoAllocateMeritRooms = async () => {

//    try {

//       const res = await API.post(
//          "/allocation/auto-merit"
//       );

//       console.log(res.data);

//       alert(res.data.message);

//       fetchData();

//    } catch (err) {

//       console.log(err);

//       alert("Auto allocation failed");
//    }
// };




// const autoAllocateMeritRooms = async () => {

//    try {

//       const res = await axios.post(

//          "https://hms-w6eu.onrender.com/api/allocation/auto",

//          {},

//          {
//             headers: {
//                Authorization:
//                   `Bearer ${token}`
//             }
//          }
//       );

//       console.log(
//          "AUTO ALLOCATION:",
//          res.data
//       );

//       // ✅ VERY IMPORTANT
//       await fetchData();

//       return res.data;

//    } catch (err) {

//       console.log(err);

//       throw err;
//    }
// };



const autoAllocateMeritRooms = async () => {

   try {

      const res = await API.post(
         "/allocation/auto"
      );

      console.log(
         "AUTO ALLOCATION:",
         res.data
      );

      await fetchData();

      return res.data;

   } catch (err) {

      console.log(err);

      throw err;
   }
};



const addComplaint = async (newComplaint) => {
    try {
        console.log("TOKEN:", localStorage.getItem("token"));
        console.log("FINAL SENT:", newComplaint); // 🔥 debug

        const res = await API.post("/complaint", newComplaint); // ✅ send FULL object

        if (res.status === 200 || res.status === 201) {
            fetchData();
        }

    } catch (error) {
        console.error("Add complaint error:", error.response?.data || error);
    }
};



    const resolveComplaint = async (id, replyText) => {
        try {
            const res = await API.put(`/complaint/${id}`, {
                status: "Resolved",
                adminReply: replyText // ✅ optional but good
            });
             console.log("RESOLVE RESPONSE:", res.data);
            if (res.status === 200){ 
                fetchData();}
        } catch (error) {
            console.error("Resolve complaint error:", error);
        }
    };

    // const allocateRoom = async (studentId, roomId) => {
    //     setStudents(students.map(s =>
    //         s._id === studentId ? { ...s, room: roomId } : s
    //     ));
    // };



//     const allocateRoom = async (
//    studentId,
//    roomId
// ) => {

//    try {

//       const res = await axios.post(

//          "https://hms-w6eu.onrender.com/api/allocation/assign",

//          {
//             studentId,
//             roomId
//          },

//          {
//             headers: {
//                Authorization:
//                   `Bearer ${token}`
//             }
//          }
//       );

//       console.log(
//          "MANUAL ALLOCATION:",
//          res.data
//       );

//       // ✅ refresh frontend
//       await fetchData();

//       return res.data;

//    } catch (err) {

//       console.log(err);
//    }
// };



const allocateRoom = async (
   studentId,
   roomId
) => {

   try {

      const res = await API.post(

         "/allocation/assign",

         {
            studentId,
            roomId
         }
      );

      console.log(
         "MANUAL ALLOCATION:",
         res.data
      );

      await fetchData();

      return res.data;

   } catch (err) {

      console.log(err);
   }
};



const addAdmissionStudent = async (data) => {

    try {

        // ✅ Get token
        const token = localStorage.getItem("token");

        const res = await axios.post(

            "https://hms-w6eu.onrender.com/api/student/admission",

            data,

            {
                headers: {

                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("ADMISSION RESPONSE:",res.data);

        fetchData();

        return res.data;

    } catch (err) {

        console.log(err);

        throw err;
    }
};

    const updateStudentFeeStatus = async (studentId, type, status) => {
        try {
            const payload =
                type === "hostel"
                    ? { hostel: status ? 15000 : 0 }
                    : { mess: status ? 12000 : 0 };
            console.log("UPDATING STUDENT:", studentId);
            //   console.log("STUDENT:", student);
            //   console.log("STUDENT ID:", student?._id);
            const res = await API.put(`/student/${studentId}/fees`, payload);

            if (res.status === 200) fetchData();
        } catch (error) {
            console.error("Fee update error:",    error.response || error.message);
        }
    };



const addNotice = async (formData) => {
    try {
        const res = await API.post("/notices", formData); // ❗ NO headers manually

        if (res.status === 200 || res.status === 201) {
            fetchData();
        }

    } catch (error) {
        console.error("Add notice error:", error.response || error.message);
    }
};


    const reloadHostelData = () => {
        fetchData();
    };

    return (
        <HostelContext.Provider value={{
            students,
            rooms,
            hostels,
            complaints,
            notices,
            messMenu,
            feeConfig,
            addComplaint,
            resolveComplaint,
            allocateRoom,
            addNotice,
            deleteNotice,
            setStudents,
            updateHostelConfig,
            updateMessMenu,
            updateStudentFeeStatus,
            updateFeeConfig,
            fetchData, 
            studentProfile,
            autoAllocateMeritRooms,
            reloadHostelData,
            addAdmissionStudent,
        }}>
            {children}
        </HostelContext.Provider>
    );
};