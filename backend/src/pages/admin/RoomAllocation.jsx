import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Users, UserCheck, Star, PieChart, Filter, Settings, ChevronRight, Building, Download, Save, RefreshCw } from 'lucide-react';

const RoomAllocation = () => {
    const { students, rooms, hostels, allocateRoom, updateHostelConfig, setStudents } = useHostel();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedYear, setSelectedYear] = useState(1);
    const [roomTypeFilter, setRoomTypeFilter] = useState('All');
    const [activeTab, setActiveTab] = useState('allocation'); // 'allocation' or 'infrastructure'

    // Admin decides year-wise seating plan
    const [yearConfig, setYearConfig] = useState({
        1: [3], // 1st Year: Triple only
        2: [2], // 2nd Year: Double only
        3: [2], // 3rd Year: Double only
        4: [1, 2] // 4th Year: Single and Double
    });

    // Infrastructure edit state
    const [editHostels, setEditHostels] = useState([...hostels]);

    const toggleYearRoomType = (year, capacity) => {
        setYearConfig(prev => {
            const current = prev[year];
            if (current.includes(capacity)) {
                return { ...prev, [year]: current.filter(c => c !== capacity) };
            } else {
                return { ...prev, [year]: [...current, capacity].sort() };
            }
        });
    };

    const handleHostelChange = (id, field, value) => {
        setEditHostels(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
    };

    const saveInfrastructure = () => {
        updateHostelConfig(editHostels);
        alert("Infrastructure updated! All rooms have been regenerated and previous allocations reset.");
        setActiveTab('allocation');
    };

    const unassigned = students.filter(s => !s.room).sort((a, b) => b.cgpa - a.cgpa);
    const yearStudents = unassigned.filter(s => s.year === selectedYear);
    const availableRooms = rooms.filter(r => r.occupants < r.capacity);

    const getRoomsForYearAndStudent = (year, student) => {
        const allowedTypes = yearConfig[year];
        // Boys in Hostels 1-4, Girls in 5-8
        const preferredHostelIds = student.gender === 'Male' ? [1, 2, 3, 4] : [5, 6, 7, 8];

        return availableRooms.filter(r =>
            allowedTypes.includes(r.capacity) &&
            preferredHostelIds.includes(r.hostelId)
        );
    };

    const runSmartAllocation = () => {
        if (unassigned.length === 0) return alert("No pending students!");

        let totalAllocated = 0;

        // Process year by year
        [1, 2, 3, 4].forEach(year => {
            const currentYearStudents = unassigned.filter(s => s.year === year);
            if (currentYearStudents.length === 0) return;

            // Separate boys and girls for gender-specific allocation
            ['Male', 'Female'].forEach(gender => {
                const genderStudents = currentYearStudents.filter(s => s.gender === gender);
                if (genderStudents.length === 0) return;

                // Boys map to hostels 1-4, Girls to 5-8
                const targetHostelIds = gender === 'Male' ? [1, 2, 3, 4] : [5, 6, 7, 8];
                const yearAllowedRooms = availableRooms.filter(r =>
                    yearConfig[year].includes(r.capacity) &&
                    targetHostelIds.includes(r.hostelId)
                );

                if (yearAllowedRooms.length === 0) return;

                // 1. Merit List (36%)
                const meritCount = Math.ceil(genderStudents.length * 0.36);
                const meritStudents = genderStudents.slice(0, meritCount);
                const remainingPool = genderStudents.slice(meritCount);

                // 2. Reservation Quotas
                const quotas = {
                    'SC': Math.ceil(genderStudents.length * 0.16),
                    'ST': Math.ceil(genderStudents.length * 0.12),
                    'OBC': Math.ceil(genderStudents.length * 0.21),
                    'MBC': Math.ceil(genderStudents.length * 0.05),
                    'EWS': Math.ceil(genderStudents.length * 0.10)
                };

                const queue = [...meritStudents];
                Object.keys(quotas).forEach(cat => {
                    const catStudents = remainingPool
                        .filter(s => s.category.includes(cat))
                        .sort((a, b) => b.cgpa - a.cgpa)
                        .slice(0, quotas[cat]);
                    queue.push(...catStudents);
                });

                const allocatedIds = new Set(queue.map(s => s.id));
                const others = remainingPool.filter(s => !allocatedIds.has(s.id));
                queue.push(...others);

                // Allocate
                let rIdx = 0;
                queue.forEach(student => {
                    if (rIdx < yearAllowedRooms.length) {
                        allocateRoom(student.id, yearAllowedRooms[rIdx].id);
                        totalAllocated++;
                        rIdx++;
                    }
                });
            });
        });

        alert(`Allocation Complete! ${totalAllocated} students assigned rooms.`);
    };

    const handleManualAllocate = (studentId, roomId) => {
        allocateRoom(studentId, roomId);
        setSelectedStudent(null);
    };

    const printMeritList = (filterGender = 'All', filterYear = 'All') => {
        let filteredStudents = [...students].sort((a, b) => b.cgpa - a.cgpa);

        if (filterGender !== 'All') {
            filteredStudents = filteredStudents.filter(s => s.gender === filterGender);
        }
        if (filterYear !== 'All') {
            filteredStudents = filteredStudents.filter(s => s.year === filterYear);
        }

        const printWindow = window.open('', '_blank');
        const reportTitle = `${filterGender === 'All' ? 'Master' : filterGender + "'s"} Merit List ${filterYear === 'All' ? '(All Years)' : '- Year ' + filterYear}`;

        const html = `
            <html>
                <head>
                    <title>${reportTitle}</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #18181b; line-height: 1.5; }
                        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #14b8a6; padding-bottom: 15px; }
                        h1 { margin: 0; color: #14b8a6; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
                        h3 { margin: 5px 0 0; color: #71717a; font-weight: 500; font-size: 16px; }
                        .meta { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 12px; color: #71717a; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th { background: #f8fafc; color: #475569; text-align: left; padding: 12px 8px; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; }
                        td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
                        .badge { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; display: inline-block; }
                        .pending { color: #92400e; background: #fef3c7; border: 1px solid #fcd34d; }
                        .allocated { color: #065f46; background: #d1fae5; border: 1px solid #6ee7b7; }
                        .gender-tag { font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 3px; margin-left: 5px; }
                        .boy { background: #dbeafe; color: #1e40af; }
                        .girl { background: #fce7f3; color: #9d174d; }
                        @media print {
                            body { padding: 0px; }
                            @page { margin: 1.5cm; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Hostel Management Portal</h1>
                        <h3>${reportTitle}</h3>
                    </div>
                    <div class="meta">
                        <span>Generated: ${new Date().toLocaleString()}</span>
                        <span>Total Records: ${filteredStudents.length}</span>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 40px;">Rank</th>
                                <th>Student Name</th>
                                <th>Year</th>
                                <th>CGPA</th>
                                <th>Category</th>
                                <th>Allocation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredStudents.map((s, i) => `
                                <tr>
                                    <td style="color: #94a3b8;">${i + 1}</td>
                                    <td>
                                        <span style="font-weight: 600;">${s.name}</span>
                                        <span class="gender-tag ${s.gender === 'Male' ? 'boy' : 'girl'}">${s.gender}</span>
                                    </td>
                                    <td>${s.year}${s.year === 1 ? 'st' : s.year === 2 ? 'nd' : s.year === 3 ? 'rd' : 'th'} Year</td>
                                    <td style="font-weight: 600;">${s.cgpa.toFixed(2)}</td>
                                    <td>${s.category}</td>
                                    <td>
                                        <span class="badge ${s.room ? 'allocated' : 'pending'}">
                                            ${s.room ? 'Room: ' + s.room : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <script>
                        window.onload = () => {
                            setTimeout(() => {
                                window.print();
                                window.close();
                            }, 500);
                        };
                    </script>
                </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    const downloadMeritList = () => {
        const allStudents = [...students].sort((a, b) => b.cgpa - a.cgpa);
        let text = "HOSTEL MANAGEMENT SYSTEM - MASTER MERIT LIST\n";
        text += `Generated on: ${new Date().toLocaleString()}\n`;
        text += "========================================================\n\n";
        text += "Rank | Name            | Year | CGPA | Category | Room\n";
        text += "--------------------------------------------------------\n";

        allStudents.forEach((s, i) => {
            const roomInfo = s.room ? s.room : "Pending";
            text += `${String(i + 1).padEnd(4)} | ${s.name.padEnd(15)} | ${String(s.year).padEnd(4)} | ${s.cgpa.toFixed(2).padEnd(4)} | ${s.category.padEnd(8)} | ${roomInfo}\n`;
        });

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `MeritList_Full_${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
            <header className="flex-between">
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Room Allocation Portal</h1>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                        <button
                            onClick={() => setActiveTab('allocation')}
                            style={{ background: 'transparent', border: 'none', borderBottom: activeTab === 'allocation' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'allocation' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', padding: '0.5rem 0', transition: 'all 0.2s' }}
                        >
                            Allocation & Merit
                        </button>
                        <button
                            onClick={() => setActiveTab('infrastructure')}
                            style={{ background: 'transparent', border: 'none', borderBottom: activeTab === 'infrastructure' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'infrastructure' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', padding: '0.5rem 0', transition: 'all 0.2s' }}
                        >
                            Infrastructure Settings
                        </button>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.35rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', gap: '0.5rem' }}>
                        <Button variant="outline" size="sm" onClick={() => printMeritList('Male', selectedYear)} style={{ border: 'none', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.75rem', padding: '0.5rem' }}>
                            Print Boys (Yr {selectedYear})
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => printMeritList('Female', selectedYear)} style={{ border: 'none', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', fontSize: '0.75rem', padding: '0.5rem' }}>
                            Print Girls (Yr {selectedYear})
                        </Button>
                        <div style={{ width: '1px', background: 'var(--border-light)', margin: '0 0.25rem' }}></div>
                        <Button variant="outline" size="sm" onClick={() => printMeritList('All', 'All')} style={{ border: 'none', background: '#000', color: 'var(--primary)', fontSize: '0.75rem', padding: '0.5rem' }}>
                            Full Master PDF
                        </Button>
                    </div>
                    <Button variant="secondary" onClick={runSmartAllocation} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#000', color: 'var(--secondary)', border: '1px solid var(--secondary)' }}>
                        <PieChart size={18} /> Run Smart Allocation
                    </Button>
                </div>
            </header>

            {activeTab === 'infrastructure' ? (
                <Card style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)' }}>
                    <div className="flex-between" style={{ marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Building size={20} color="var(--primary)" /> Infrastructure Configuration
                            </h3>
                            <p className="subtitle" style={{ fontSize: '0.85rem' }}>Set hostel names and room capacities. (1-4: Boys, 5-8: Girls)</p>
                        </div>
                        <Button variant="primary" onClick={saveInfrastructure} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Save size={18} /> Save Changes
                        </Button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Boys Section */}
                        <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                            <h4 style={{ color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Badge style={{ background: '#3b82f6', color: '#fff' }}>1-4</Badge> Boys Hostels
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {editHostels.slice(0, 4).map(h => (
                                    <div key={h.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '1rem', alignItems: 'end' }}>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Hostel {h.id} Name</label>
                                            <input
                                                value={h.name}
                                                onChange={(e) => handleHostelChange(h.id, 'name', e.target.value)}
                                                style={{ width: '100%', background: '#000', border: '1px solid var(--border-light)', color: '#fff', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Rooms</label>
                                            <input
                                                type="number"
                                                value={h.roomCount}
                                                onChange={(e) => handleHostelChange(h.id, 'roomCount', parseInt(e.target.value) || 0)}
                                                style={{ width: '100%', background: '#000', border: '1px solid var(--border-light)', color: '#fff', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Girls Section */}
                        <div style={{ background: 'rgba(236, 72, 153, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
                            <h4 style={{ color: '#ec4899', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Badge style={{ background: '#ec4899', color: '#fff' }}>5-8</Badge> Girls Hostels
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {editHostels.slice(4, 8).map(h => (
                                    <div key={h.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '1rem', alignItems: 'end' }}>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Hostel {h.id} Name</label>
                                            <input
                                                value={h.name}
                                                onChange={(e) => handleHostelChange(h.id, 'name', e.target.value)}
                                                style={{ width: '100%', background: '#000', border: '1px solid var(--border-light)', color: '#fff', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Rooms</label>
                                            <input
                                                type="number"
                                                value={h.roomCount}
                                                onChange={(e) => handleHostelChange(h.id, 'roomCount', parseInt(e.target.value) || 0)}
                                                style={{ width: '100%', background: '#000', border: '1px solid var(--border-light)', color: '#fff', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            ) : (
                <>
                    {/* Admin Config Section */}
                    <Card style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Settings size={20} color="var(--primary)" /> Seating Plan Configuration
                            </h3>
                            <Badge style={{ background: '#000', color: 'var(--text-muted)' }}>Admin Decision Only</Badge>
                        </div>
                        <div className="grid-4" style={{ gap: '1rem' }}>
                            {[1, 2, 3, 4].map(year => (
                                <div key={year} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                                    <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{year === 4 ? 'Final' : year + (year === 1 ? 'st' : year === 2 ? 'nd' : 'rd')} Year</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {[1, 2, 3].map(cap => (
                                            <button
                                                key={cap}
                                                onClick={() => toggleYearRoomType(year, cap)}
                                                style={{
                                                    padding: '0.35rem 0.65rem',
                                                    fontSize: '0.7rem',
                                                    borderRadius: 'var(--radius-sm)',
                                                    background: yearConfig[year].includes(cap) ? 'var(--primary)' : '#000',
                                                    color: yearConfig[year].includes(cap) ? '#000' : 'var(--text-muted)',
                                                    border: '1px solid ' + (yearConfig[year].includes(cap) ? 'var(--primary)' : 'var(--border-light)'),
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {cap === 1 ? 'S' : cap === 2 ? 'D' : 'T'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        <Card style={{ padding: 0 }}>
                            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {[1, 2, 3, 4].map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: selectedYear === year ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
                                                border: 'none',
                                                borderBottom: selectedYear === year ? '2px solid var(--primary)' : '2px solid transparent',
                                                color: selectedYear === year ? 'var(--primary)' : 'var(--text-muted)',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {year === 4 ? 'Final Year' : year + (year === 1 ? 'st' : year === 2 ? 'nd' : 'rd')}
                                        </button>
                                    ))}
                                </div>
                                <Badge style={{ background: '#000', color: 'var(--primary)', border: '1px solid rgba(20, 184, 166, 0.3)' }}>
                                    {yearStudents.length} Students
                                </Badge>
                            </div>
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                {yearStudents.length === 0 ? (
                                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        <Users size={40} style={{ margin: '0 auto 1rem', opacity: 0.1 }} />
                                        No pending students for this year
                                    </div>
                                ) : (
                                    yearStudents.map((student, idx) => (
                                        <div key={student.id}
                                            onClick={() => setSelectedStudent(student)}
                                            style={{
                                                padding: '1rem 1.5rem',
                                                borderBottom: '1px solid var(--border-light)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                background: selectedStudent?.id === student.id ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
                                                transition: 'all 0.2s'
                                            }}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: idx < Math.ceil(yearStudents.length * 0.36) ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: idx < Math.ceil(yearStudents.length * 0.36) ? 'var(--secondary)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: 600, color: '#fff', display: 'block' }}>{student.name} <Badge style={{ fontSize: '0.6rem', padding: '0 0.4rem', border: '1px solid var(--border-light)' }}>{student.gender}</Badge></span>
                                                    <span className="subtitle" style={{ fontSize: '0.75rem' }}>{student.category} • CGPA: {student.cgpa}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {idx < Math.ceil(yearStudents.length * 0.36) && <Star size={14} color="var(--secondary)" fill="var(--secondary)" />}
                                                <ChevronRight size={18} color="var(--border-light)" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>

                        <Card style={{ padding: 0, position: 'relative' }}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0 }}>Manual Allocation</h3>
                                    <select
                                        value={roomTypeFilter}
                                        onChange={(e) => setRoomTypeFilter(e.target.value)}
                                        style={{ padding: '0.4rem', background: '#000', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                                    >
                                        <option>All</option>
                                        <option>Single</option>
                                        <option>Double</option>
                                        <option>Triple</option>
                                    </select>
                                </div>
                                {selectedStudent ? (
                                    <div style={{ padding: '0.75rem', background: 'rgba(20, 184, 166, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
                                        <span className="subtitle" style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>YEAR {selectedStudent.year} • {selectedStudent.name} ({selectedStudent.gender})</span>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                            Eligible: {yearConfig[selectedStudent.year].map(c => c === 1 ? 'S' : c === 2 ? 'D' : 'T').join('/')} in {selectedStudent.gender === 'Male' ? 'Boys' : 'Girls'} Hostels
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        Select student to view year-compatible rooms
                                    </div>
                                )}
                            </div>

                            <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem' }}>
                                {!selectedStudent ? (
                                    <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        <UserCheck size={40} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                        <p>Select a student to start manual assignment.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                        {getRoomsForYearAndStudent(selectedStudent.year, selectedStudent)
                                            .filter(r => roomTypeFilter === 'All' ||
                                                (roomTypeFilter === 'Single' && r.capacity === 1) ||
                                                (roomTypeFilter === 'Double' && r.capacity === 2) ||
                                                (roomTypeFilter === 'Triple' && r.capacity === 3))
                                            .map(room => (
                                                <div key={room.id}
                                                    onClick={() => handleManualAllocate(selectedStudent.id, room.id)}
                                                    style={{
                                                        padding: '0.75rem',
                                                        background: '#000',
                                                        border: '1px solid var(--border-light)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.25rem'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                                                    <div className="flex-between">
                                                        <span style={{ fontWeight: 600, color: '#fff' }}>{room.id}</span>
                                                        <Badge style={{
                                                            fontSize: '0.65rem',
                                                            background: '#000',
                                                            color: room.capacity === 1 ? 'var(--info)' : room.capacity === 2 ? 'var(--success)' : 'var(--warning)',
                                                            border: `1px solid ${room.capacity === 1 ? 'var(--info)' : room.capacity === 2 ? 'var(--success)' : 'var(--warning)'}`
                                                        }}>
                                                            {room.capacity === 1 ? 'Single' : room.capacity === 2 ? 'Double' : 'Triple'}
                                                        </Badge>
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                                        {room.block} • {room.occupants}/{room.capacity}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};

export default RoomAllocation;
