// import React, { useState } from 'react';
// import { useHostel } from '../../context/HostelContext';
// import Card from '../../components/ui/Card';
// import Badge from '../../components/ui/Badge';
// import Button from '../../components/ui/Button';

// const RoomAllocation = () => {

//     const {
//         students,
//         rooms,
//         allocateRoom
//     } = useHostel();

//     console.log("ALL STUDENTS:", students);

//     // ✅ FIXED
//     const [selectedYear, setSelectedYear] = useState(1);

//     const [selectedStudent, setSelectedStudent] = useState(null);

//     const [roomTypeFilter, setRoomTypeFilter] = useState('All');

//     // ✅ Year Wise Configuration
//     const [yearConfig, setYearConfig] = useState({
//         "1st Year": [3],
//         "2nd Year": [2],
//         "3rd Year": [2],
//         "4th Year": [1, 2]
//     });

//     // ✅ Toggle Room Type
//     const toggleYearRoomType = (year, capacity) => {

//         setYearConfig(prev => {

//             const current = prev[year] || [];

//             if (current.includes(capacity)) {

//                 return {
//                     ...prev,
//                     [year]: current.filter(
//                         c => c !== capacity
//                     )
//                 };
//             }

//             return {

//                 ...prev,

//                 [year]: [...current, capacity]
//                     .sort((a, b) => a - b)
//             };
//         });
//     };

//     // ✅ Unassigned Students
//     const unassigned = students
//         .filter(s => !s.room)
//         .sort((a, b) => (b.cgpa || 0) - (a.cgpa || 0));

//     // ✅ Selected Year Students
//     const yearStudents = unassigned.filter(s => {

//         // numeric year
//         if (Number(s.year) === Number(selectedYear)) {
//             return true;
//         }


//         // string year support
//         if (
//             s.year === "1st Year" && selectedYear === 1
//         ) return true;

//         if (
//             s.year === "2nd Year" && selectedYear === 2
//         ) return true;

//         if (
//             s.year === "3rd Year" && selectedYear === 3
//         ) return true;

//         if (
//             s.year === "4th Year" && selectedYear === 4
//         ) return true;

//         return false;
//     });


//     console.log("SELECTED YEAR:", selectedYear);

//     console.log(
//         "FILTERED STUDENTS:",
//         yearStudents
//     );

//     // ✅ Available Rooms
//     const availableRooms = rooms.filter(
//         r => r.occupants < r.capacity
//     );



//     const getRoomsForYearAndStudent = (year, student) => {

//     let yearKey = "";

//     // ✅ Handle all year formats
//     if (
//         year === 1 ||
//         year === "1" ||
//         year === "1st Year"
//     ) {

//         yearKey = "1st Year";
//     }

//     else if (
//         year === 2 ||
//         year === "2" ||
//         year === "2nd Year"
//     ) {

//         yearKey = "2nd Year";
//     }

//     else if (
//         year === 3 ||
//         year === "3" ||
//         year === "3rd Year"
//     ) {

//         yearKey = "3rd Year";
//     }

//     else {

//         yearKey = "Final Year";
//     }

//     // ✅ Allowed room capacities
//     const allowedTypes =
//         yearConfig[yearKey] || [1, 2, 3];

//     // ✅ Boys/Girls hostel separation
//     const preferredHostelIds =

//         (student.gender || "Male") === "Male"

//             ? [1, 2, 3, 4]

//             : [5, 6, 7, 8];

//     console.log("YEAR KEY:", yearKey);

//     console.log("ALLOWED TYPES:", allowedTypes);

//     console.log("ROOMS:", rooms);

//     // ✅ Final filtered rooms
//     const filteredRooms = rooms.filter(r => {

//         return (

//             allowedTypes.includes(
//                 Number(r.capacity)
//             )

//             &&

//             preferredHostelIds.includes(
//                 Number(r.hostelId)
//             )

//             &&

//             r.year === yearKey

//             &&

//             r.occupied < r.capacity
//         );
//     });

//     console.log("FILTERED ROOMS:", filteredRooms);

//     return filteredRooms;
// };



//     // ✅ Allocate Room
//     const handleManualAllocate = (
//         studentId,
//         roomId
//     ) => {

//         allocateRoom(studentId, roomId);

//         setSelectedStudent(null);
//     };


//     return (

//         <div
//             className="animate-fade-in"
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '2rem'
//             }}
//         >

//             {/* HEADER */}
//             <header className="flex-between">

//                 <div>

//                     <h1
//                         style={{
//                             fontSize: '2rem',
//                             marginBottom: '0.25rem'
//                         }}
//                     >
//                         Room Allocation
//                     </h1>

//                     <p className="subtitle">
//                         Smart hostel room allocation
//                     </p>

//                 </div>

//             </header>

//             {/* CONFIGURATION */}
//             <Card
//                 style={{
//                     padding: '1.5rem'
//                 }}
//             >

//                 <div
//                     className="flex-between"
//                     style={{
//                         marginBottom: '1.5rem'
//                     }}
//                 >

//                     <h3 style={{ margin: 0 }}>
//                         Seating Plan Configuration
//                     </h3>

//                     <Badge>
//                         Admin Decision Only
//                     </Badge>

//                 </div>

//                 <div
//                     className="grid-4"
//                     style={{
//                         gap: '1rem'
//                     }}
//                 >

//                     {[1, 2, 3, 4].map(year => (

//                         <div
//                             key={year}
//                             style={{
//                                 padding: '1rem',
//                                 background: 'rgba(255,255,255,0.03)',
//                                 borderRadius: 'var(--radius-sm)',
//                                 border: '1px solid var(--border-light)'
//                             }}
//                         >

//                             <div
//                                 style={{
//                                     marginBottom: '1rem',
//                                     fontWeight: 600
//                                 }}
//                             >

//                                 {
//                                     year === 1
//                                         ? '1st Year'
//                                         : year === 2
//                                             ? '2nd Year'
//                                             : year === 3
//                                                 ? '3rd Year'
//                                                 : 'Final Year'
//                                 }

//                             </div>

//                             <div
//                                 style={{
//                                     display: 'flex',
//                                     gap: '0.5rem'
//                                 }}
//                             >

//                                 {[1, 2, 3].map(cap => (

//                                     <button

//                                         key={cap}

//                                         onClick={() =>
//                                             toggleYearRoomType(

//                                                 year === 1
//                                                     ? "1st Year"
//                                                     : year === 2
//                                                         ? "2nd Year"
//                                                         : year === 3
//                                                             ? "3rd Year"
//                                                             : "4th Year",

//                                                 cap
//                                             )
//                                         }

//                                         style={{
//                                             padding: '0.4rem 0.8rem',
//                                             borderRadius: '8px',
//                                             border: 'none',
//                                             cursor: 'pointer',

//                                             background:
//                                                 (
//                                                     yearConfig[
//                                                     year === 1
//                                                         ? "1st Year"
//                                                         : year === 2
//                                                             ? "2nd Year"
//                                                             : year === 3
//                                                                 ? "3rd Year"
//                                                                 : "4th Year"
//                                                     ] || []
//                                                 ).includes(cap)

//                                                     ? 'var(--primary)'
//                                                     : '#000',

//                                             color:
//                                                 (
//                                                     yearConfig[
//                                                     year === 1
//                                                         ? "1st Year"
//                                                         : year === 2
//                                                             ? "2nd Year"
//                                                             : year === 3
//                                                                 ? "3rd Year"
//                                                                 : "4th Year"
//                                                     ] || []
//                                                 ).includes(cap)

//                                                     ? '#000'
//                                                     : '#fff'
//                                         }}
//                                     >

//                                         {
//                                             cap === 1
//                                                 ? 'S'
//                                                 : cap === 2
//                                                     ? 'D'
//                                                     : 'T'
//                                         }

//                                     </button>
//                                 ))}
//                             </div>

//                         </div>
//                     ))}
//                 </div>

//             </Card>

//             {/* MAIN */}
//             <div
//                 style={{
//                     display: 'grid',
//                     gridTemplateColumns: '1.5fr 1fr',
//                     gap: '2rem'
//                 }}
//             >

//                 {/* STUDENTS */}
//                 <Card style={{ padding: 0 }}>

//                     <div
//                         style={{
//                             padding: '1rem',
//                             borderBottom: '1px solid var(--border-light)',
//                             display: 'flex',
//                             gap: '1rem'
//                         }}
//                     >

//                         {[1, 2, 3, 4].map(year => (

//                             <button

//                                 key={year}

//                                 onClick={() =>
//                                     setSelectedYear(year)
//                                 }

//                                 style={{
//                                     padding: '0.5rem 1rem',
//                                     border: 'none',
//                                     cursor: 'pointer',
//                                     borderRadius: '8px',

//                                     background:
//                                         selectedYear === year
//                                             ? 'var(--primary)'
//                                             : '#111',

//                                     color:
//                                         selectedYear === year
//                                             ? '#000'
//                                             : '#fff'
//                                 }}
//                             >

//                                 {
//                                     year === 4
//                                         ? 'Final'
//                                         : year
//                                 }

//                             </button>
//                         ))}

//                     </div>

//                     <div
//                         style={{
//                             maxHeight: '500px',
//                             overflowY: 'auto'
//                         }}
//                     >

//                         {
//                             yearStudents.length === 0

//                                 ? (

//                                     <div
//                                         style={{
//                                             padding: '2rem'
//                                         }}
//                                     >
//                                         No students found
//                                     </div>

//                                 )

//                                 : (

//                                     yearStudents.map(student => (

//                                         <div

//                                             key={student._id}

//                                             onClick={() =>
//                                                 setSelectedStudent(student)
//                                             }

//                                             style={{
//                                                 padding: '1rem',
//                                                 borderBottom:
//                                                     '1px solid var(--border-light)',

//                                                 cursor: 'pointer',

//                                                 background:
//                                                     selectedStudent?._id === student._id
//                                                         ? 'rgba(20,184,166,0.1)'
//                                                         : 'transparent'
//                                             }}
//                                         >

//                                             <div
//                                                 style={{
//                                                     fontWeight: 600
//                                                 }}
//                                             >
//                                                 {student.name}
//                                             </div>

//                                             <div
//                                                 style={{
//                                                     fontSize: '0.8rem',
//                                                     color: 'var(--text-muted)'
//                                                 }}
//                                             >

//                                                 {student.gender}
//                                                 {' • '}
//                                                 {student.category}
//                                                 {' • '}
//                                                 CGPA:
//                                                 {student.cgpa}

//                                             </div>

//                                         </div>
//                                     ))
//                                 )
//                         }

//                     </div>

//                 </Card>

//                 {/* ROOMS */}
//                 <Card style={{ padding: 0 }}>

//                     <div
//                         style={{
//                             padding: '1rem',
//                             borderBottom: '1px solid var(--border-light)'
//                         }}
//                     >

//                         <div
//                             className="flex-between"
//                             style={{
//                                 marginBottom: '1rem'
//                             }}
//                         >

//                             <h3 style={{ margin: 0 }}>
//                                 Manual Allocation
//                             </h3>

//                             <select

//                                 value={roomTypeFilter}

//                                 onChange={(e) =>
//                                     setRoomTypeFilter(
//                                         e.target.value
//                                     )
//                                 }

//                                 style={{
//                                     padding: '0.5rem'
//                                 }}
//                             >

//                                 <option>All</option>
//                                 <option>Single</option>
//                                 <option>Double</option>
//                                 <option>Triple</option>

//                             </select>

//                         </div>

//                         {
//                             selectedStudent ? (

//                                 <div
//                                     style={{
//                                         fontSize: '0.85rem'
//                                     }}
//                                 >

//                                     Selected:
//                                     {' '}
//                                     <strong>
//                                         {selectedStudent.name}
//                                     </strong>

//                                 </div>

//                             ) : (

//                                 <div
//                                     style={{
//                                         color: 'var(--text-muted)'
//                                     }}
//                                 >
//                                     Select Student
//                                 </div>
//                             )
//                         }

//                     </div>

//                     <div
//                         style={{
//                             padding: '1rem',
//                             maxHeight: '500px',
//                             overflowY: 'auto'
//                         }}
//                     >

//                         {
//                             !selectedStudent

//                                 ? (

//                                     <div>
//                                         No Student Selected
//                                     </div>

//                                 )

//                                 : (

//                                     <div
//                                         style={{
//                                             display: 'grid',
//                                             gridTemplateColumns: '1fr 1fr',
//                                             gap: '1rem'
//                                         }}
//                                     >

//                                         {
//                                             getRoomsForYearAndStudent(
//                                                 selectedStudent.year,
//                                                 selectedStudent
//                                             )

//                                                 .filter(r =>

//                                                     roomTypeFilter === 'All'

//                                                     ||

//                                                     (
//                                                         roomTypeFilter === 'Single'
//                                                         &&
//                                                         r.capacity === 1
//                                                     )

//                                                     ||

//                                                     (
//                                                         roomTypeFilter === 'Double'
//                                                         &&
//                                                         r.capacity === 2
//                                                     )

//                                                     ||

//                                                     (
//                                                         roomTypeFilter === 'Triple'
//                                                         &&
//                                                         r.capacity === 3
//                                                     )
//                                                 )

//                                                 .map(room => (

//                                                     <div

//                                                         key={room.id}

//                                                         style={{
//                                                             padding: '1rem',
//                                                             background: '#000',
//                                                             border:
//                                                                 '1px solid var(--border-light)',
//                                                             borderRadius: '10px',
//                                                             display: 'flex',
//                                                             flexDirection: 'column',
//                                                             gap: '0.5rem'
//                                                         }}
//                                                     >

//                                                         <div className="flex-between">

//                                                             <span>
//                                                                 {room.id}
//                                                             </span>

//                                                             <Badge>

//                                                                 {
//                                                                     room.capacity === 1
//                                                                         ? 'Single'
//                                                                         : room.capacity === 2
//                                                                             ? 'Double'
//                                                                             : 'Triple'
//                                                                 }

//                                                             </Badge>

//                                                         </div>

//                                                         <div
//                                                             style={{
//                                                                 fontSize: '0.75rem',
//                                                                 color: 'var(--text-muted)'
//                                                             }}
//                                                         >
//                                                             {room.block}
//                                                         </div>

//                                                         <div
//                                                             style={{
//                                                                 fontSize: '0.75rem',
//                                                                 color: 'var(--text-muted)'
//                                                             }}
//                                                         >

//                                                             Occupancy:
//                                                             {' '}
//                                                             {room.occupied}
//                                                             /
//                                                             {room.capacity}

//                                                         </div>

//     <button onClick={() =>handleManualAllocate(selectedStudent._id,
//                                                                     room.id
//                                                                 )
//                                                             }



//                                                             style={{
//                                                                 marginTop: '0.5rem',
//                                                                 width: '100%',
//                                                                 padding: '0.7rem',
//                                                                 borderRadius: '8px',
//                                                                 border: 'none',
//                                                                 background: 'var(--primary)',
//                                                                 color: '#000',
//                                                                 fontWeight: 700,
//                                                                 cursor: 'pointer'
//                                                             }}
//                                                         >

//                                                             Allocate This Room

//                                                         </button>

//                                                     </div>
//                                                 ))
//                                         }

//                                     </div>
//                                 )
//                         }

//                     </div>

//                 </Card>

//             </div>

//         </div>
//     );

// };

// export default RoomAllocation;















import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const RoomAllocation = () => {

    const {
        students,
        rooms,
        allocateRoom
    } = useHostel();

    const [selectedYear, setSelectedYear] = useState(1);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [roomTypeFilter, setRoomTypeFilter] =
        useState('All');

    // ===============================
    // YEAR CONFIGURATION
    // ===============================

    const [yearConfig, setYearConfig] =
        useState({

            "1st Year": [3],

            "2nd Year": [2],

            "3rd Year": [2],

            "Final Year": [1, 2]
        });

    // ===============================
    // TOGGLE ROOM TYPE
    // ===============================

    const toggleYearRoomType = (
        year,
        capacity
    ) => {

        setYearConfig(prev => {

            const current = prev[year] || [];

            if (current.includes(capacity)) {

                return {

                    ...prev,

                    [year]:
                        current.filter(
                            c => c !== capacity
                        )
                };
            }

            return {

                ...prev,

                [year]:

                    [...current, capacity]
                        .sort((a, b) => a - b)
            };
        });
    };

    // ===============================
    // UNASSIGNED STUDENTS
    // ===============================

    const unassigned = students

        .filter(s => !s.room)

        .sort(
            (a, b) =>
                (b.cgpa || 0) -
                (a.cgpa || 0)
        );

    // ===============================
    // YEAR FILTER
    // ===============================

    const yearStudents =
        unassigned.filter(s => {

            if (
                Number(s.year) ===
                Number(selectedYear)
            ) {

                return true;
            }

            if (
                s.year === "1st Year"
                &&
                selectedYear === 1
            ) return true;

            if (
                s.year === "2nd Year"
                &&
                selectedYear === 2
            ) return true;

            if (
                s.year === "3rd Year"
                &&
                selectedYear === 3
            ) return true;

            if (
                s.year === "Final Year"
                &&
                selectedYear === 4
            ) return true;

            return false;
        });

    // ===============================
    // ROOM FILTER LOGIC
    // ===============================

    const getRoomsForYearAndStudent = (
        year,
        student
    ) => {

        let yearKey = "";

        if (
            year === 1 ||
            year === "1" ||
            year === "1st Year"
        ) {

            yearKey = "1st Year";
        }

        else if (
            year === 2 ||
            year === "2" ||
            year === "2nd Year"
        ) {

            yearKey = "2nd Year";
        }

        else if (
            year === 3 ||
            year === "3" ||
            year === "3rd Year"
        ) {

            yearKey = "3rd Year";
        }

        else {

            yearKey = "Final Year";
        }

        const allowedTypes =
            yearConfig[yearKey]
            || [1, 2, 3];

        const preferredHostelIds =

            (student.gender || "Male")
                === "Male"

                ? [1, 2, 3, 4]

                : [5, 6, 7, 8];

      console.log("YEAR KEY:", yearKey);

console.log("STUDENT:", student);

console.log("ROOMS:", rooms);

  const filteredRooms = rooms.filter(room => {

   // ✅ Year match

   const yearMatch =

      room.year === yearKey;

   // ✅ Gender match

   const genderMatch =

      (
         student.gender === "Male"

         &&

         room.genderType === "Boys"
      )

      ||

      (
         student.gender === "Female"

         &&

         room.genderType === "Girls"
      );

   // ✅ Room available

   const availableMatch =

      room.occupied < room.capacity;

   return (

      yearMatch

      &&

      genderMatch

      &&

      availableMatch
   );
});

console.log(
   "FILTERED ROOMS:",
   filteredRooms
);

        return filteredRooms;
    };
 

    // ===============================
    // MANUAL ROOM ALLOCATION
    // ===============================

    const handleManualAllocate = (
        studentId,
        roomId
    ) => {

        allocateRoom(
            studentId,
            roomId
        );

        alert(
            "Room Allocated Successfully"
        );

        setSelectedStudent(null);
    };

    return (

        <div
            className="animate-fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >

            {/* HEADER */}

            <header className="flex-between">

                <div>

                    <h1
                        style={{
                            fontSize: '2rem',
                            marginBottom: '0.25rem'
                        }}
                    >

                        Room Allocation

                    </h1>

                    <p className="subtitle">

                        Smart hostel room allocation

                    </p>

                </div>

            </header>

            {/* CONFIGURATION */}

            <Card
                style={{
                    padding: '1.5rem'
                }}
            >

                <div
                    className="flex-between"
                    style={{
                        marginBottom: '1.5rem'
                    }}
                >

                    <h3 style={{ margin: 0 }}>

                        Seating Plan Configuration

                    </h3>

                    <Badge>

                        Admin Decision Only

                    </Badge>

                </div>

                <div
                    className="grid-4"
                    style={{
                        gap: '1rem'
                    }}
                >

                    {[1, 2, 3, 4].map(year => (

                        <div

                            key={year}

                            style={{
                                padding: '1rem',
                                background:
                                    'rgba(255,255,255,0.03)',

                                borderRadius:
                                    'var(--radius-sm)',

                                border:
                                    '1px solid var(--border-light)'
                            }}
                        >

                            <div
                                style={{
                                    marginBottom: '1rem',
                                    fontWeight: 600
                                }}
                            >

                                {
                                    year === 1
                                        ? '1st Year'
                                        : year === 2
                                            ? '2nd Year'
                                            : year === 3
                                                ? '3rd Year'
                                                : 'Final Year'
                                }

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: '0.5rem'
                                }}
                            >

                                {[1, 2, 3].map(cap => (

                                    <button

                                        key={cap}

                                        onClick={() =>

                                            toggleYearRoomType(

                                                year === 1
                                                    ? "1st Year"
                                                    : year === 2
                                                        ? "2nd Year"
                                                        : year === 3
                                                            ? "3rd Year"
                                                            : "Final Year",

                                                cap
                                            )
                                        }

                                        style={{

                                            padding: '0.4rem 0.8rem',

                                            borderRadius: '8px',

                                            border: 'none',

                                            cursor: 'pointer',

                                            background:

                                                (
                                                    yearConfig[
                                                    year === 1
                                                        ? "1st Year"
                                                        : year === 2
                                                            ? "2nd Year"
                                                            : year === 3
                                                                ? "3rd Year"
                                                                : "Final Year"
                                                    ] || []
                                                ).includes(cap)

                                                    ? 'var(--primary)'
                                                    : '#000',

                                            color:

                                                (
                                                    yearConfig[
                                                    year === 1
                                                        ? "1st Year"
                                                        : year === 2
                                                            ? "2nd Year"
                                                            : year === 3
                                                                ? "3rd Year"
                                                                : "Final Year"
                                                    ] || []
                                                ).includes(cap)

                                                    ? '#000'
                                                    : '#fff'
                                        }}
                                    >

                                        {
                                            cap === 1
                                                ? 'S'
                                                : cap === 2
                                                    ? 'D'
                                                    : 'T'
                                        }

                                    </button>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

            </Card>

            {/* MAIN SECTION */}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr',
                    gap: '2rem'
                }}
            >

                {/* STUDENT LIST */}

                <Card style={{ padding: 0 }}>

                    <div
                        style={{
                            padding: '1rem',
                            borderBottom:
                                '1px solid var(--border-light)',
                            display: 'flex',
                            gap: '1rem'
                        }}
                    >

                        {[1, 2, 3, 4].map(year => (

                            <button

                                key={year}

                                onClick={() =>
                                    setSelectedYear(year)
                                }

                                style={{
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '8px',

                                    background:
                                        selectedYear === year
                                            ? 'var(--primary)'
                                            : '#111',

                                    color:
                                        selectedYear === year
                                            ? '#000'
                                            : '#fff'
                                }}
                            >

                                {
                                    year === 4
                                        ? 'Final'
                                        : year
                                }

                            </button>
                        ))}
                    </div>

                    <div
                        style={{
                            maxHeight: '500px',
                            overflowY: 'auto'
                        }}
                    >

                        {
                            yearStudents.map(student => (

                                <div

                                    key={student._id}

                                    onClick={() =>
                                        setSelectedStudent(student)
                                    }

                                    style={{

                                        padding: '1rem',

                                        borderBottom:
                                            '1px solid var(--border-light)',

                                        cursor: 'pointer',

                                        background:

                                            selectedStudent?._id
                                                === student._id

                                                ? 'rgba(20,184,166,0.1)'

                                                : 'transparent'
                                    }}
                                >

                                    <div
                                        style={{
                                            fontWeight: 600
                                        }}
                                    >

                                        {student.name}

                                    </div>

                                    <div
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                'var(--text-muted)'
                                        }}
                                    >

                                        {student.gender}

                                        {' • '}

                                        {student.category}

                                        {' • '}

                                        CGPA:
                                        {student.cgpa}

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </Card>

                {/* ROOM LIST */}

                <Card style={{ padding: 0 }}>

                    <div
                        style={{
                            padding: '1rem',
                            borderBottom:
                                '1px solid var(--border-light)'
                        }}
                    >

                        <div
                            className="flex-between"
                            style={{
                                marginBottom: '1rem'
                            }}
                        >

                            <h3 style={{ margin: 0 }}>

                                Manual Allocation

                            </h3>

                            <select

                                value={roomTypeFilter}

                                onChange={(e) =>
                                    setRoomTypeFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option>All</option>
                                <option>Single</option>
                                <option>Double</option>
                                <option>Triple</option>

                            </select>

                        </div>

                        {

                            selectedStudent

                                ? (

                                    <div>

                                        Selected:

                                        <strong>

                                            {' '}

                                            {selectedStudent.name}

                                        </strong>

                                    </div>
                                )

                                : (

                                    <div>

                                        Select Student

                                    </div>
                                )
                        }

                    </div>

                    <div
                        style={{
                            padding: '1rem',
                            maxHeight: '500px',
                            overflowY: 'auto'
                        }}
                    >

                        {
                            !selectedStudent

                                ? (

                                    <div>

                                        No Student Selected

                                    </div>
                                )

                                : (

                                    getRoomsForYearAndStudent(

                                        selectedStudent.year,

                                        selectedStudent

                                    )

                                        .filter(r =>

                                            roomTypeFilter === 'All'

                                            ||

                                            (
                                                roomTypeFilter === 'Single'
                                                &&
                                                r.capacity === 1
                                            )

                                            ||

                                            (
                                                roomTypeFilter === 'Double'
                                                &&
                                                r.capacity === 2
                                            )

                                            ||

                                            (
                                                roomTypeFilter === 'Triple'
                                                &&
                                                r.capacity === 3
                                            )
                                        )

                                        .map(room => (

                                            <div

                                                key={room._id}

                                                style={{

                                                    padding: '1rem',

                                                    background: '#000',

                                                    border:
                                                        '1px solid var(--border-light)',

                                                    borderRadius: '10px',

                                                    marginBottom: '1rem'
                                                }}
                                            >

                                                <div className="flex-between">

                                                    <span>

                                                        {room.roomId}

                                                    </span>

                                                    <Badge>

                                                        {room.type}

                                                    </Badge>

                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '0.8rem',
                                                        marginTop: '0.5rem'
                                                    }}
                                                >

                                                    {room.block}

                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '0.8rem',
                                                        marginTop: '0.5rem'
                                                    }}
                                                >

                                                    Occupancy:

                                                    {' '}

                                                    {room.occupied}

                                                    /

                                                    {room.capacity}

                                                </div>

                                                <button

                                                    onClick={() =>

                                                        handleManualAllocate(

                                                            selectedStudent._id,

                                                            room._id
                                                        )
                                                    }

                                                    style={{

                                                        marginTop: '1rem',

                                                        width: '100%',

                                                        padding: '0.8rem',

                                                        border: 'none',

                                                        borderRadius: '8px',

                                                        background:
                                                            'var(--primary)',

                                                        color: '#000',

                                                        fontWeight: 700,

                                                        cursor: 'pointer'
                                                    }}
                                                >

                                                    Allocate This Room

                                                </button>

                                            </div>
                                        ))
                                )
                        }

                    </div>

                </Card>

            </div>

        </div>
    );
};

export default RoomAllocation;