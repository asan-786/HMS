import React from 'react';
import { useHostel } from '../../context/HostelContext';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Users, Home, AlertCircle, FileText, CreditCard, Utensils, Download } from 'lucide-react';

const Overview = () => {
    const { students, rooms, complaints, notices } = useHostel();

    // ✅ SAFE DATA
    const safeStudents = Array.isArray(students) ? students : [];
    const safeRooms = Array.isArray(rooms) ? rooms : [];
    const safeComplaints = Array.isArray(complaints) ? complaints : [];
    const safeNotices = Array.isArray(notices) ? notices : [];

    // ✅ CALCULATIONS
    const totalCapacity = safeRooms.reduce((acc, r) => acc + (r.capacity || 0), 0);
    const totalOccupants = safeRooms.reduce((acc, r) => acc + (r.occupants || 0), 0);

    const occupancyRate = totalCapacity > 0
        ? Math.round((totalOccupants / totalCapacity) * 100)
        : 0;

    const pendingComplaints = safeComplaints.filter(c => c.status === 'Pending').length;

    const pendingAllocations = safeStudents.filter(s => !s.room);
    const pendingHostelFees = safeStudents.filter(s => !s.feesPaid);
    const pendingMessFees = safeStudents.filter(s => !s.messFeesPaid);

    // ✅ PRINT FUNCTION
    const printPendingReport = (type, studentList) => {
        const printWindow = window.open('', '_blank');

        const titles = {
            allocation: 'Pending Room Allocation Report',
            hostel: 'Pending Hostel Fee Report',
            mess: 'Pending Mess Fee Report'
        };

        const html = `
            <html>
                <head>
                    <title>${titles[type]}</title>
                    <style>
                        body { font-family: Arial; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 10px; border: 1px solid #ccc; }
                    </style>
                </head>
                <body>
                    <h2>${titles[type]}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${studentList.map(s => `
                                <tr>
                                    <td>${s.name}</td>
                                    <td>${s.email}</td>
                                    <td>${s.year}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <h1>Admin Dashboard</h1>

            {/* ✅ TOP STATS */}
            <div className="grid-4">
                <StatCard title="Total Students" value={safeStudents.length} icon={<Users />} />
                <StatCard title="Occupancy" value={`${occupancyRate}%`} icon={<Home />} />
                <StatCard title="Pending Complaints" value={pendingComplaints} icon={<AlertCircle />} />
                <StatCard title="Notices" value={safeNotices.length} icon={<FileText />} />
            </div>

            {/* ✅ FEES + ALLOCATION */}
            <div className="grid-3">
                <StatCard title="No Room" value={pendingAllocations.length} icon={<AlertCircle />} />
                <StatCard title="Hostel Fees Pending" value={pendingHostelFees.length} icon={<CreditCard />} />
                <StatCard title="Mess Fees Pending" value={pendingMessFees.length} icon={<Utensils />} />
            </div>

            {/* ✅ ALLOCATION LIST */}
            <Card>
                <h3>Pending Allocation</h3>

                {pendingAllocations.slice(0, 5).map(s => (
                    <div key={s._id || s.id}>
                        <p>{s.name} (Year {s.year})</p>
                    </div>
                ))}

                <Button onClick={() => printPendingReport('allocation', pendingAllocations)}>
                    <Download /> Print
                </Button>
            </Card>

            {/* ✅ FEES LIST */}
            <Card>
                <h3>Pending Fees</h3>

                {pendingHostelFees.slice(0, 3).map(s => (
                    <div key={`h-${s._id || s.id}`}>
                        <p>{s.name} - Hostel Fee Pending</p>
                        <Badge status="danger">Hostel</Badge>
                    </div>
                ))}

                {pendingMessFees.slice(0, 3).map(s => (
                    <div key={`m-${s._id || s.id}`}>
                        <p>{s.name} - Mess Fee Pending</p>
                        <Badge status="danger">Mess</Badge>
                    </div>
                ))}

                <Button onClick={() => printPendingReport('hostel', pendingHostelFees)}>
                    <Download /> Hostel Report
                </Button>

                <Button onClick={() => printPendingReport('mess', pendingMessFees)}>
                    <Download /> Mess Report
                </Button>
            </Card>

        </div>
    );
};

export default Overview;
