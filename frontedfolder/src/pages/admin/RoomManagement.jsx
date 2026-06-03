// import React, { useState } from 'react';
// import { mockRooms } from "../../data/mockData";
// import { useHostel } from '../../context/HostelContext';
// import Card from '../../components/ui/Card';
// import Badge from '../../components/ui/Badge';
// import { Users, Search } from 'lucide-react';
// // import Room from '../../../../backend/src/models/Room';

// const RoomManagement = () => {
//     // const { rooms } = useHostel();
//     const rooms = mockRooms;
//     const [filter, setFilter] = useState('All');
//      const [selectedGender, setSelectedGender] = useState("All");

// const [selectedYear, setSelectedYear] = useState("All");

//     const filteredRooms = rooms.filter(room => {
//  if (
//         selectedGender !== "All" &&
//         room.gender !== selectedGender
//     ) {
//         return false;
//     }

//     // Year filter
//     if (
//         selectedYear !== "All" &&
//         room.year !== selectedYear
//     ) {
//         return false;
//     }

//         if (filter === 'Available') return room.occupants < room.capacity;
//         if (filter === 'Full') return room.occupants === room.capacity;
//         if (filter === 'Assigned') return room.occupants > 0;
//         if (filter === 'Unassigned') return room.occupants === 0;
//         return true;
//     });
//       console.log("ROOMS:", rooms);

//     return (
//         <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//             <header className="flex-between" style={{ alignItems: 'flex-end' }}>
//                 <div>
//                     <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Room Management</h1>
                 
//                     <p className="subtitle">Monitor occupancy and room status across all blocks.</p>
//                 </div>
                      

//         {/* Gender Filter */}
// <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>

//   {["All", "Boys", "Girls"].map((gender) => (

//     <button
//       key={gender}
//       onClick={() => setSelectedGender(gender)}
//       style={{
//         padding: "8px 15px",
//         borderRadius: "20px",
//         border: "none",
//         cursor: "pointer",
//         background:
//           selectedGender === gender ? "#14b8a6" : "#1e293b",
//         color: "#fff"
//       }}
//     >
//       {gender}
//     </button>

//   ))}

// </div>


// {/* Year Filter */}
// <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

//   {["All", 1, 2, 3, 4].map((year) => (

//     <button
//       key={year}
//       onClick={() => setSelectedYear(year)}
//       style={{
//         padding: "8px 15px",
//         borderRadius: "20px",
//         border: "none",
//         cursor: "pointer",
//         background:
//           selectedYear === year ? "#14b8a6" : "#1e293b",
//         color: "#fff"
//       }}
//     >
//       {year === "All" ? "All Years" : `${year} Year`}
//     </button>

//   ))}

// </div>




//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                     {['All', 'Available', 'Full', 'Assigned', 'Unassigned'].map(f => (
//                         <button
//                             key={f}
//                             onClick={() => setFilter(f)}
//                             style={{
//                                 padding: '0.5rem 1rem',
//                                 borderRadius: 'var(--radius-full)',
//                                 border: '1px solid var(--border-light)',
//                                 background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
//                                 color: filter === f ? '#fff' : 'var(--text-muted)',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s',
//                                 fontWeight: 500,
//                                 fontSize: '0.85rem'
//                             }}
//                         >
//                             {f}
//                         </button>
//                     ))}
//                 </div>
//             </header>


//         <div className="grid-3">
//     {filteredRooms.map(room => {

//         const isFull = room.occupants === room.capacity;

//         const availability = room.capacity - room.occupants;

//         return (
//             <Card
//                 key={room.id}
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     padding: '1.5rem',
//                     borderTop: `4px solid ${
//                         isFull ? 'var(--danger)' : 'var(--success)'
//                     }`
//                 }}
//             >

//                 {/* Header */}
//                 <div
//                     className="flex-between"
//                     style={{ marginBottom: '1.5rem' }}
//                 >
//                     <h2
//                         style={{
//                             margin: 0,
//                             fontSize: '1.75rem',
//                             letterSpacing: '0.05em'
//                         }}
//                     >
//                         {room.id}
//                     </h2>

//                     <Badge status={isFull ? 'danger' : 'success'}>
//                         {isFull
//                             ? 'Full'
//                             : `${availability} Slot(s)`
//                         }
//                     </Badge>
//                 </div>

//                 {/* Room Details */}
//                 <div
//                     style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: '0.75rem',
//                         marginBottom: '1.5rem'
//                     }}
//                 >

//                     {/* Type */}
//                     <div className="flex-between">
//                         <span
//                             className="subtitle"
//                             style={{ fontSize: '0.85rem' }}
//                         >
//                             Type
//                         </span>

//                         <span
//                             style={{
//                                 fontWeight: 500,
//                                 color: '#fff'
//                             }}
//                         >
//                             {room.type}
//                         </span>
//                     </div>

//                     {/* Block */}
//                     <div className="flex-between">
//                         <span
//                             className="subtitle"
//                             style={{ fontSize: '0.85rem' }}
//                         >
//                             Block
//                         </span>

//                         <span
//                             style={{
//                                 fontWeight: 500,
//                                 color: '#fff'
//                             }}
//                         >
//                             {room.block}
//                         </span>
//                     </div>

//                     {/* Gender */}
//                        <div
//         style={{
//             display: "flex",
//             gap: "0.5rem",
//             flexWrap: "wrap"
//         }}
//     >
//                         <span
//                             className="subtitle"
//                             style={{ fontSize: '0.85rem' }}
//                         >
//                             Gender
//                         </span>

//                         <span
//                             style={{
//                                 fontWeight: 500,
//                                 color: '#fff'
//                             }}
//                         >
//                             {room.gender}
//                         </span>
//                     </div>

//                     {/* Year */}
//                        <div
//         style={{
//             display: "flex",
//             gap: "0.5rem",
//             flexWrap: "wrap"
//         }}
//     >
//                         <span
//                             className="subtitle"
//                             style={{ fontSize: '0.85rem' }}
//                         >
//                             Year
//                         </span>

//                         <span
//                             style={{
//                                 fontWeight: 500,
//                                 color: '#fff'
//                             }}
//                         >
//                             {room.year} Year
//                         </span>
//                     </div>

//                 </div>

//                 {/* Occupancy */}
//                 <div
//                     style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                         background: 'rgba(255,255,255,0.03)',
//                         padding: '0.75rem',
//                         borderRadius: 'var(--radius-sm)'
//                     }}
//                 >

//                     <Users
//                         size={16}
//                         color="var(--primary)"
//                     />

//                     <div
//                         style={{
//                             display: 'flex',
//                             gap: '0.25rem'
//                         }}
//                     >
//                         {Array.from({
//                             length: room.capacity
//                         }).map((_, i) => (

//                             <div
//                                 key={i}
//                                 style={{
//                                     width: 12,
//                                     height: 12,
//                                     borderRadius: '50%',
//                                     background:
//                                         i < room.occupants
//                                             ? 'var(--primary)'
//                                             : 'rgba(255,255,255,0.1)'
//                                 }}
//                             />

//                         ))}
//                     </div>

//                     <span
//                         className="subtitle"
//                         style={{
//                             fontSize: '0.75rem',
//                             marginLeft: 'auto'
//                         }}
//                     >
//                         {room.occupants}/{room.capacity}
//                     </span>

//                 </div>

//             </Card>
//         );
//     })}
// </div>
// </div>
//     );
// };

// export default RoomManagement;



import React, { useState } from 'react';

import { useHostel } from '../../context/HostelContext';

import Card from '../../components/ui/Card';

import Badge from '../../components/ui/Badge';

import { Users } from 'lucide-react';

const RoomManagement = () => {

    // ✅ Use backend rooms
    const { rooms } = useHostel();

    const [filter, setFilter] =
        useState('All');

    const [selectedGender, setSelectedGender] =
        useState("All");

    const [selectedYear, setSelectedYear] =
        useState("All");

    // ✅ Filter rooms

    const filteredRooms = rooms.filter(room => {

        // Gender filter

        if (

            selectedGender !== "All"

            &&

            room.genderType !== selectedGender
        ) {

            return false;
        }

        // Year filter

        if (

            selectedYear !== "All"

            &&

            room.year !== selectedYear
        ) {

            return false;
        }

        // Occupancy filters

        if (filter === 'Available') {

            return room.occupied < room.capacity;
        }

        if (filter === 'Full') {

            return room.occupied >= room.capacity;
        }

        if (filter === 'Assigned') {

            return room.occupied > 0;
        }

        if (filter === 'Unassigned') {

            return room.occupied === 0;
        }

        return true;
    });

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

            <header
                className="flex-between"
                style={{
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >

                <div>

                    <h1
                        style={{
                            fontSize: '2rem',
                            marginBottom: '0.25rem'
                        }}
                    >

                        Room Management

                    </h1>

                    <p className="subtitle">

                        Monitor occupancy and room status across all blocks.

                    </p>

                </div>

            </header>

            {/* GENDER FILTER */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                }}
            >

                {
                    ["All", "Boys", "Girls"]
                        .map(gender => (

                            <button

                                key={gender}

                                onClick={() =>
                                    setSelectedGender(gender)
                                }

                                style={{

                                    padding: "8px 15px",

                                    borderRadius: "20px",

                                    border: "none",

                                    cursor: "pointer",

                                    background:

                                        selectedGender === gender

                                            ? "#14b8a6"

                                            : "#1e293b",

                                    color: "#fff"
                                }}
                            >

                                {gender}

                            </button>
                        ))
                }

            </div>

            {/* YEAR FILTER */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                }}
            >

                {
                    [
                        "All",

                        "1st Year",

                        "2nd Year",

                        "3rd Year",

                        "Final Year"
                    ]

                        .map(year => (

                            <button

                                key={year}

                                onClick={() =>
                                    setSelectedYear(year)
                                }

                                style={{

                                    padding: "8px 15px",

                                    borderRadius: "20px",

                                    border: "none",

                                    cursor: "pointer",

                                    background:

                                        selectedYear === year

                                            ? "#14b8a6"

                                            : "#1e293b",

                                    color: "#fff"
                                }}
                            >

                                {year}

                            </button>
                        ))
                }

            </div>

            {/* STATUS FILTER */}

            <div
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                }}
            >

                {
                    [
                        'All',

                        'Available',

                        'Full',

                        'Assigned',

                        'Unassigned'
                    ]

                        .map(f => (

                            <button

                                key={f}

                                onClick={() =>
                                    setFilter(f)
                                }

                                style={{

                                    padding: '0.5rem 1rem',

                                    borderRadius:
                                        'var(--radius-full)',

                                    border:
                                        '1px solid var(--border-light)',

                                    background:

                                        filter === f

                                            ? 'var(--primary)'

                                            : 'rgba(255,255,255,0.05)',

                                    color:

                                        filter === f

                                            ? '#fff'

                                            : 'var(--text-muted)',

                                    cursor: 'pointer',

                                    fontWeight: 500
                                }}
                            >

                                {f}

                            </button>
                        ))
                }

            </div>

            {/* ROOM GRID */}

            <div className="grid-3">

                {
                    filteredRooms.map(room => {

                        const isFull =

                            room.occupied >= room.capacity;

                        const availability =

                            room.capacity - room.occupied;

                        return (

                            <Card

                                key={room._id}

                                style={{

                                    display: 'flex',

                                    flexDirection: 'column',

                                    padding: '1.5rem',

                                    borderTop:

                                        `4px solid ${

                                            isFull

                                                ? 'var(--danger)'

                                                : 'var(--success)'
                                        }`
                                }}
                            >

                                {/* HEADER */}

                                <div
                                    className="flex-between"
                                    style={{
                                        marginBottom: '1.5rem'
                                    }}
                                >

                                    <h2
                                        style={{
                                            margin: 0,
                                            fontSize: '1.5rem'
                                        }}
                                    >

                                        {room.roomId}

                                    </h2>

                                    <Badge
                                        status={
                                            isFull
                                                ? 'danger'
                                                : 'success'
                                        }
                                    >

                                        {
                                            isFull

                                                ? 'Full'

                                                : `${availability} Slot(s)`
                                        }

                                    </Badge>

                                </div>

                                {/* ROOM DETAILS */}

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem',
                                        marginBottom: '1.5rem'
                                    }}
                                >

                                    <div className="flex-between">

                                        <span className="subtitle">

                                            Type

                                        </span>

                                        <span>

                                            {room.type}

                                        </span>

                                    </div>

                                    <div className="flex-between">

                                        <span className="subtitle">

                                            Block

                                        </span>

                                        <span>

                                            {room.block}

                                        </span>

                                    </div>

                                    <div className="flex-between">

                                        <span className="subtitle">

                                            Gender

                                        </span>

                                        <span>

                                            {room.genderType}

                                        </span>

                                    </div>

                                    <div className="flex-between">

                                        <span className="subtitle">

                                            Year

                                        </span>

                                        <span>

                                            {room.year}

                                        </span>

                                    </div>

                                    <div className="flex-between">

                                        <span className="subtitle">

                                            Floor

                                        </span>

                                        <span>

                                            Floor {room.floor}

                                        </span>

                                    </div>

                                </div>

                                {/* OCCUPANCY */}

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background:
                                            'rgba(255,255,255,0.03)',
                                        padding: '0.75rem',
                                        borderRadius:
                                            'var(--radius-sm)'
                                    }}
                                >

                                    <Users
                                        size={16}
                                        color="var(--primary)"
                                    />

                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '0.25rem'
                                        }}
                                    >

                                        {
                                            Array.from({
                                                length: room.capacity
                                            })

                                                .map((_, i) => (

                                                    <div

                                                        key={`${room._id}-${i}`}

                                                        style={{

                                                            width: 12,

                                                            height: 12,

                                                            borderRadius: '50%',

                                                            background:

                                                                i < room.occupied

                                                                    ? 'var(--primary)'

                                                                    : 'rgba(255,255,255,0.1)'
                                                        }}
                                                    />
                                                ))
                                        }

                                    </div>

                                    <span
                                        className="subtitle"
                                        style={{
                                            marginLeft: 'auto'
                                        }}
                                    >

                                        {room.occupied}
                                        /
                                        {room.capacity}

                                    </span>

                                </div>

                            </Card>
                        );
                    })
                }

            </div>

        </div>
    );
};

export default RoomManagement;