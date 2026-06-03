// import React from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { useHostel } from "../../context/HostelContext";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";

// const MeritList = () => {

//     const { students } = useHostel();

//     const generatePDF = (year, gender) => {

//         const filteredStudents = students
//             .filter(student => student.year === year && student.gender === gender)
//             .sort((a, b) => Number(b.cgpa) - Number(a.cgpa));

//         const doc = new jsPDF();

//         doc.setFontSize(18);

//         doc.text(`Hostel Merit List - ${year} (${gender})`, 14, 20);

//         autoTable(doc, {

//             startY: 30,

//             head: [[
//                 "Rank",
//                 "Name",
//                 "CGPA",
//                 "Category",
//                 "Gender"
//             ]],

//             body: filteredStudents.map((student, index) => ([
//                 index + 1,
//                 student.name,
//                 student.cgpa,
//                 student.category,
//                 student.gender
//             ]))
//         });

//         doc.save(`${year}-Merit-List.pdf`);
//     };

//     const years = [
//         "1st Year",
//         "2nd Year",
//         "3rd Year",
//         "Final Year"
//     ];

//     const genders = [
//    "Male",
//    "Female"
// ];

//     return (

//         <div
//             style={{
//                 padding: "2rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "2rem"
//             }}
//         >

//             <div>

//                 <h1
//                     style={{
//                         fontSize: "2rem",
//                         marginBottom: "0.5rem"
//                     }}
//                 >
//                     Hostel Merit Lists
//                 </h1>

//                 <p className="subtitle">
//                     Download year-wise hostel merit lists.
//                 </p>

//             </div>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//                     gap: "1.5rem"
//                 }}
//             >

//                 {years.map((year) => {

//                     const yearStudents = students
//                         .filter(student => student.year === year)
//                         .sort((a, b) => Number(b.cgpa) - Number(a.cgpa));

//                     return (

//                         <Card
//                             key={year}
//                             style={{
//                                 padding: "1.5rem",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: "1rem"
//                             }}
//                         >

//                             <h2>{year}</h2>

//                             <p>
//                                 Total Students: {yearStudents.length}
//                             </p>

//                             <div
//                                 style={{
//                                     maxHeight: "250px",
//                                     overflowY: "auto"
//                                 }}
//                             >

//                                 {yearStudents.length === 0 ? (

//                                     <p>No students found.</p>

//                                 ) : (

//                                     yearStudents.map((student, index) => (

//                                         <div
//                                             key={student._id}
//                                             style={{
//                                                 padding: "0.75rem 0",
//                                                 borderBottom: "1px solid rgba(255,255,255,0.08)"
//                                             }}
//                                         >

//                                             <strong>
//                                                 #{index + 1}
//                                             </strong>

//                                             {" "}
//                                             {student.name}

//                                             <div
//                                                 style={{
//                                                     fontSize: "0.9rem",
//                                                     opacity: 0.8
//                                                 }}
//                                             >
//                                                 CGPA: {student.cgpa}
//                                             </div>

//                                         </div>
//                                     ))
//                                 )}

//                             </div>

//                             <Button
//                                 variant="primary"
//                                 onClick={() => generatePDF(year, gender)}
//                             >
//                                 Download PDF
//                             </Button>

//                         </Card>
//                     );
//                 })}

//             </div>

//         </div>
//     );
// };

// export default MeritList;




// import React from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { useHostel } from "../../context/HostelContext";
// import Card from "../../components/ui/Card";
// import Button from "../../components/ui/Button";

// const MeritList = () => {

//     const { students ,autoAllocateMeritRooms} = useHostel();

//     const years = [
//         "1st Year",
//         "2nd Year",
//         "3rd Year",
//         "Final Year"
//     ];

//     const genders = [
//         "Male",
//         "Female"
//     ];

//     const generatePDF = (year, gender) => {

//         const filteredStudents = students
//             .filter(student =>
//                 student.year === year &&
//                 student.gender === gender
//             )
//             .sort((a, b) =>
//                 Number(b.cgpa) - Number(a.cgpa)
//             );

//         const doc = new jsPDF();

//         doc.setFontSize(18);

//         doc.text(
//             `${gender} Hostel Merit List - ${year}`,
//             14,
//             20
//         );

//         autoTable(doc, {

//             startY: 30,

//             head: [[
//                 "Rank",
//                 "Name",
//                 "CGPA",
//                 "Category",
//                 "Gender"
//             ]],

//             body: filteredStudents.map((student, index) => ([
//                 index + 1,
//                 student.name,
//                 student.cgpa,
//                 student.category,
//                 student.gender
//             ]))
//         });

//         doc.save(`${gender}-${year}-Merit-List.pdf`);
//     };

//     return (

//         <div
//             style={{
//                 padding: "2rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "2rem"
//             }}
//         >

//             <div>

//                 <h1
//                     style={{
//                         fontSize: "2rem",
//                         marginBottom: "0.5rem"
//                     }}
//                 >
//                     Hostel Merit Lists
//                 </h1>

//                 <p className="subtitle">
//                     Download gender-wise and year-wise hostel merit lists.
//                 </p>

//             </div>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//                     gap: "1.5rem"
//                 }}
//             >

//                 {genders.map((gender) => (

//                     years.map((year) => {

//                         const filteredStudents = students
//                             .filter(student =>
//                                 student.year === year &&
//                                 student.gender === gender
//                             )
//                             .sort((a, b) =>
//                                 Number(b.cgpa) - Number(a.cgpa)
//                             );

//                         return (

//                             <Card
//                                 key={`${gender}-${year}`}
//                                 style={{
//                                     padding: "1.5rem",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     gap: "1rem"
//                                 }}
//                             >

//                                 <h2>
//                                     {gender} - {year}
//                                 </h2>

//                                 <p>
//                                     Total Students: {filteredStudents.length}
//                                 </p>

//                                 <div
//                                     style={{
//                                         maxHeight: "250px",
//                                         overflowY: "auto"
//                                     }}
//                                 >

//                                     {filteredStudents.length === 0 ? (

//                                         <p>No students found.</p>

//                                     ) : (

//                                         filteredStudents.map((student, index) => (

//                                             <div
//                                                 key={student._id}
//                                                 style={{
//                                                     padding: "0.75rem 0",
//                                                     borderBottom: "1px solid rgba(255,255,255,0.08)"
//                                                 }}
//                                             >

//                                                 <strong>
//                                                     #{index + 1}
//                                                 </strong>

//                                                 {" "}
//                                                 {student.name}

//                                                 <div
//                                                     style={{
//                                                         fontSize: "0.9rem",
//                                                         opacity: 0.8
//                                                     }}
//                                                 >
//                                                     CGPA: {student.cgpa}
//                                                 </div>

//                                             </div>
//                                         ))
//                                     )}

//                                 </div>

//                                 <Button
//                                     variant="primary"
//                                     onClick={() =>
//                                         generatePDF(year, gender)
//                                     }
//                                 >
//                                     Download PDF
//                                 </Button>

//                             </Card>
//                         );
//                     })
//                 ))}

//             </div>

//         </div>
//     );
// };

// export default MeritList;





import React from "react";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import { useHostel } from "../../context/HostelContext";

import Card from "../../components/ui/Card";

import Button from "../../components/ui/Button";


const MeritList = () => {

    const {

        students,

        autoAllocateMeritRooms,

        fetchData

    } = useHostel();


    const years = [

        "1st Year",

        "2nd Year",

        "3rd Year",

        "Final Year"
    ];


    const genders = [

        "Male",

        "Female"
    ];


    // ==================================================
    // GENERATE PDF
    // ==================================================

    const generatePDF = (year, gender) => {

        const filteredStudents = students

            .filter(student =>

                student.year === year &&

                student.gender === gender
            )

            .sort((a, b) =>

                Number(b.cgpa) - Number(a.cgpa)
            );


        const doc = new jsPDF();


        doc.setFontSize(18);


        doc.text(

            `${gender} Hostel Merit List - ${year}`,

            14,

            20
        );


        autoTable(doc, {

            startY: 30,

            head: [[

                "Rank",

                "Name",

                "CGPA",

                "Category",

                "Room",

                "Status"
            ]],


            body: filteredStudents.map(

                (student, index) => ([

                    index + 1,

                    student.name,

                    student.cgpa,

                    student.category,

                    student.room?.roomId ||

                    student.room ||

                    "Not Allocated",

                    student.room

                        ? "Allocated"

                        : "Pending"
                ])
            )
        });


        doc.save(

            `${gender}-${year}-Merit-List.pdf`
        );
    };


    // ==================================================
    // AUTO ALLOCATION
    // ==================================================

    const handleAutoAllocation = async () => {

        try {

            await autoAllocateMeritRooms();

            await fetchData();

            alert(

                "Rooms allocated successfully"
            );

        } catch (err) {

            console.log(err);

            alert(

                "Allocation failed"
            );
        }
    };


    return (

        <div

            style={{

                padding: "2rem",

                display: "flex",

                flexDirection: "column",

                gap: "2rem"
            }}
        >

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    flexWrap: "wrap",

                    gap: "1rem"
                }}
            >

                <div>

                    <h1

                        style={{

                            fontSize: "2rem",

                            marginBottom: "0.5rem"
                        }}
                    >

                        Hostel Merit Lists

                    </h1>


                    <p className="subtitle">

                        Generate year-wise and gender-wise hostel merit lists.

                    </p>

                </div>


                {/* ========================================= */}
                {/* AUTO ALLOCATE BUTTON */}
                {/* ========================================= */}

                <Button

                    variant="primary"

                    onClick={handleAutoAllocation}

                >

                    Auto Allocate Rooms

                </Button>

            </div>


            {/* ========================================= */}
            {/* MERIT CARDS */}
            {/* ========================================= */}

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns:

                        "repeat(auto-fit, minmax(320px, 1fr))",

                    gap: "1.5rem"
                }}
            >

                {

                    genders.map((gender) => (

                        years.map((year) => {

                            const filteredStudents = students

                                .filter(student =>

                                    student.year === year &&

                                    student.gender === gender
                                )

                                .sort((a, b) =>

                                    Number(b.cgpa) -

                                    Number(a.cgpa)
                                );


                            return (

                                <Card

                                    key={`${gender}-${year}`}

                                    style={{

                                        padding: "1.5rem",

                                        display: "flex",

                                        flexDirection: "column",

                                        gap: "1rem"
                                    }}
                                >

                                    {/* ========================= */}
                                    {/* TITLE */}
                                    {/* ========================= */}

                                    <div>

                                        <h2>

                                            {gender} - {year}

                                        </h2>


                                        <p>

                                            Total Students:

                                            {" "}

                                            {

                                                filteredStudents.length
                                            }

                                        </p>

                                    </div>


                                    {/* ========================= */}
                                    {/* STUDENT LIST */}
                                    {/* ========================= */}

                                    <div

                                        style={{

                                            maxHeight: "320px",

                                            overflowY: "auto"
                                        }}
                                    >

                                        {

                                            filteredStudents.length === 0

                                                ? (

                                                    <p>

                                                        No students found.

                                                    </p>

                                                )

                                                : (

                                                    filteredStudents.map(

                                                        (

                                                            student,

                                                            index

                                                        ) => (

                                                            <div

                                                                key={student._id}

                                                                style={{

                                                                    padding: "0.9rem 0",

                                                                    borderBottom:

                                                                        "1px solid rgba(255,255,255,0.08)",

                                                                    display: "flex",

                                                                    flexDirection: "column",

                                                                    gap: "0.25rem"
                                                                }}
                                                            >

                                                                {/* Rank + Name */}

                                                                <strong>

                                                                    #

                                                                    {

                                                                        index + 1
                                                                    }

                                                                    {" "}

                                                                    {

                                                                        student.name
                                                                    }

                                                                </strong>


                                                                {/* CGPA */}

                                                                <div

                                                                    style={{

                                                                        fontSize: "0.9rem",

                                                                        opacity: 0.85
                                                                    }}
                                                                >

                                                                    CGPA:

                                                                    {" "}

                                                                    {

                                                                        student.cgpa
                                                                    }

                                                                </div>


                                                                {/* Category */}

                                                                <div

                                                                    style={{

                                                                        fontSize: "0.85rem",

                                                                        opacity: 0.75
                                                                    }}
                                                                >

                                                                    Category:

                                                                    {" "}

                                                                    {

                                                                        student.category
                                                                    }

                                                                </div>


                                                                {/* Room */}

                                                                <div

                                                                    style={{

                                                                        fontSize: "0.85rem",

                                                                        opacity: 0.75
                                                                    }}
                                                                >

                                                                    Room:

                                                                    {" "}

                                                                    {

                                                                        student.room?.roomId

                                                                        ||

                                                                        student.room

                                                                        ||

                                                                        "Not Allocated"
                                                                    }

                                                                </div>


                                                                {/* Status */}

                                                                <div

                                                                    style={{

                                                                        fontSize: "0.85rem",

                                                                        color:

                                                                            student.room

                                                                                ? "#14b8a6"

                                                                                : "#f59e0b"
                                                                    }}
                                                                >

                                                                    {

                                                                        student.room

                                                                            ? "Allocated"

                                                                            : "Waiting For Allocation"
                                                                    }

                                                                </div>

                                                            </div>
                                                        )
                                                    )
                                                )
                                        }

                                    </div>


                                    {/* ========================= */}
                                    {/* DOWNLOAD PDF */}
                                    {/* ========================= */}

                                    <Button

                                        variant="secondary"

                                        onClick={() =>

                                            generatePDF(

                                                year,

                                                gender
                                            )
                                        }
                                    >

                                        Download PDF

                                    </Button>

                                </Card>
                            );
                        })
                    ))
                }

            </div>

        </div>
    );
};


export default MeritList;