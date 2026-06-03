// import React, { useState } from 'react';
// import { useHostel } from '../../context/HostelContext';
// import Card from '../../components/ui/Card';
// import Badge from '../../components/ui/Badge';
// import { Search, UserSearch } from 'lucide-react';

// const StudentDirectory = () => {
//     const { students } = useHostel();
//     const [searchTerm, setSearchTerm] = useState('');

//     // ✅ SAFE DATA
//     const safeStudents = Array.isArray(students) ? students : [];

//     const filteredStudents = safeStudents.filter(student => {
//         const query = searchTerm.toLowerCase();
//        const roomName =

//    student.room?.roomId

//       ? student.room.roomId.toLowerCase()

//       : 'unassigned';

//         return (
//             (student.name || '').toLowerCase().includes(query) ||
//             roomName.includes(query)
//         );
//     });

//     return (
//         <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
//             <header className="flex-between" style={{ alignItems: 'flex-end' }}>
//                 <div>
//                     <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Student Directory</h1>
//                     <p className="subtitle">View all registered students and their details.</p>
//                 </div>

//                 <div style={{ position: 'relative', width: '300px' }}>
//                     <Search
//                         size={18}
//                         style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Search student name or room..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '0.75rem 1rem 0.75rem 2.5rem',
//                             borderRadius: 'var(--radius-full)'
//                         }}
//                     />
//                 </div>
//             </header>

//             <Card style={{ padding: 0, overflowX: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Room</th>
//                             <th>CGPA</th>
//                             <th>Category</th>
//                             <th>Roll No.</th>
//                             <th>Fees</th>
//                             <th>Mess</th>
//                             <th>Phone</th>
//                             <th>Parent Name</th>
//                             <th>Parent Phone</th>
//                              <th>Guardian Name</th>
//                             <th>Guardian Phone</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {filteredStudents.length > 0 ? (
//                             filteredStudents.map(student => (
//                                 // ✅ FIXED KEY HERE
//                                 <tr key={student._id || student.id}>
                                    
//                                     <td>
//                                         <div>{student.name}</div>
//                                         <div>{student.email}</div>
//                                     </td>

//                                     <td>
//                                         {student.room?.roomId || "Unassigned"}
//                                     </td>

//                                     <td>
//                                         {(student.cgpa || 0).toFixed(2)}
//                                     </td>

//                                     <td>
//                                         {student.category}
//                                     </td>
//                                       <td>{student.rollNo}</td>
//                                     <td>{student.phone}</td>
//                                       <td>{student.parent}</td>

//                                   <td>{student.parentPhone}</td> 

//                                   <td>{student.guardianName}</td>

//                                   <td>{student.guardianPhone}</td> 
                                 

//                                     <td>
//                                         <Badge status={student.feesPaid ? 'success' : 'danger'}>
//                                             {student.feesPaid ? 'Paid' : 'Due'}
//                                         </Badge>
//                                     </td>

//                                     <td>
//                                         <Badge status={student.messEnrolled ? 'info' : 'default'}>
//                                             {student.messEnrolled ? 'Enrolled' : 'Opt-out'}
//                                         </Badge>
//                                     </td>

//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>
//                                     <UserSearch size={48} />
//                                     <p>No students found</p>
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>

//                 </table>
//             </Card>
//         </div>
//     );
// };

// export default StudentDirectory;



import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Search, UserSearch } from 'lucide-react';

const StudentDirectory = () => {

    const { students } = useHostel();

    const [searchTerm, setSearchTerm] =
        useState('');

    // ✅ SAFE ARRAY
    const safeStudents =
        Array.isArray(students)
            ? students
            : [];

    // ✅ SEARCH FILTER
    const filteredStudents =
        safeStudents.filter((student) => {

            const query =
                searchTerm.toLowerCase();

            const roomName =
                student.room?.roomId
                    ? student.room.roomId.toLowerCase()
                    : 'unassigned';

            return (

                (student.name || '')
                    .toLowerCase()
                    .includes(query)

                ||

                roomName.includes(query)
            );
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
                    alignItems: 'flex-end'
                }}
            >

                <div>

                    <h1
                        style={{
                            fontSize: '2rem',
                            marginBottom: '0.25rem'
                        }}
                    >

                        Student Directory

                    </h1>

                    <p className="subtitle">

                        View all registered students and their details.

                    </p>

                </div>

                {/* SEARCH */}

                <div
                    style={{
                        position: 'relative',
                        width: '320px'
                    }}
                >

                    <Search
                        size={18}
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }}
                    />

                    <input

                        type="text"

                        placeholder="Search student name or room..."

                        value={searchTerm}

                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }

                        style={{

                            width: '100%',

                            padding:
                                '0.75rem 1rem 0.75rem 2.5rem',

                            borderRadius:
                                'var(--radius-full)'
                        }}
                    />
                </div>

            </header>

            {/* TABLE */}

            <Card
                style={{
                    padding: 0,
                    overflowX: 'auto'
                }}
            >

                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        minWidth: '1400px'
                    }}
                >

                    {/* TABLE HEADER */}

                    <thead>

                        <tr
                            style={{
                                background:
                                    'rgba(255,255,255,0.04)'
                            }}
                        >

                            <th>Name</th>

                            <th>Room</th>

                            <th>CGPA</th>

                            <th>Category</th>

                            <th>Roll No.</th>

                            <th>Phone</th>

                            <th>Parent Name</th>

                            <th>Parent Phone</th>

                            <th>Guardian Name</th>

                            <th>Guardian Phone</th>

                            <th>Fees</th>

                            <th>Mess</th>

                        </tr>

                    </thead>

                    {/* TABLE BODY */}

                    <tbody>

                        {filteredStudents.length > 0 ? (

                            filteredStudents.map((student) => (

                                <tr
                                    key={
                                        student._id ||
                                        student.id
                                    }

                                    style={{
                                        borderBottom:
                                            '1px solid rgba(255,255,255,0.08)'
                                    }}
                                >

                                    {/* NAME */}

                                    <td>

                                        <div
                                            style={{
                                                fontWeight: '600',
                                                color: '#fff'
                                            }}
                                        >
                                            {student.name}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: '0.85rem',
                                                color: '#9ca3af'
                                            }}
                                        >
                                            {student.email}
                                        </div>

                                    </td>

                                    {/* ROOM */}

                                    <td>

                                        <Badge
                                            status={
                                                student.room
                                                    ? 'info'
                                                    : 'default'
                                            }
                                        >

                                            {
                                                student.room?.roomId ||

                                                "Unassigned"
                                            }

                                        </Badge>

                                    </td>

                                    {/* CGPA */}

                                    <td>

                                        {
                                            (
                                                student.cgpa || 0
                                            ).toFixed(2)
                                        }

                                    </td>

                                    {/* CATEGORY */}

                                    <td>

                                        {student.category}

                                    </td>

                                    {/* ROLL NUMBER */}

                                    <td>

                                        {student.rollNo}

                                    </td>

                                    {/* PHONE */}

                                    <td>

                                        {student.phone}

                                    </td>

                                    {/* PARENT NAME */}

                                    <td>

                                        {
                                            student.parentName ||
                                            "N/A"
                                        }

                                    </td>

                                    {/* PARENT PHONE */}

                                    <td>

                                        {
                                            student.parentPhone ||
                                            "N/A"
                                        }

                                    </td>

                                    {/* GUARDIAN NAME */}

                                    <td>

                                        {
                                            student.guardianName ||
                                            "N/A"
                                        }

                                    </td>

                                    {/* GUARDIAN PHONE */}

                                    <td>

                                        {
                                            student.guardianPhone ||
                                            "N/A"
                                        }

                                    </td>

                                    {/* FEES */}

                                    <td>

                                        <Badge
                                            status={
                                                student.feesPaid
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >

                                            {
                                                student.feesPaid
                                                    ? 'Paid'
                                                    : 'Due'
                                            }

                                        </Badge>

                                    </td>

                                    {/* MESS */}

                                    <td>

                                        <Badge
                                            status={
                                                student.messEnrolled
                                                    ? 'info'
                                                    : 'default'
                                            }
                                        >

                                            {
                                                student.messEnrolled
                                                    ? 'Enrolled'
                                                    : 'Opt-out'
                                            }

                                        </Badge>

                                    </td>

                                </tr>
                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="12"
                                    style={{
                                        textAlign: 'center',
                                        padding: '3rem'
                                    }}
                                >

                                    <UserSearch
                                        size={48}
                                        style={{
                                            marginBottom: '1rem',
                                            color: '#6b7280'
                                        }}
                                    />

                                    <p>

                                        No students found

                                    </p>

                                </td>

                            </tr>
                        )}

                    </tbody>

                </table>

            </Card>

        </div>
    );
};

export default StudentDirectory;