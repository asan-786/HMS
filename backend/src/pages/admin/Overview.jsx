import React from 'react';
import { useHostel } from '../../context/HostelContext';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Users, Home, AlertCircle, FileText, CreditCard, Utensils, Download } from 'lucide-react';

const Overview = () => {
    const { students, rooms, complaints, notices } = useHostel();

    const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
    const totalOccupants = rooms.reduce((acc, r) => acc + r.occupants, 0);
    const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupants / totalCapacity) * 100) : 0;

    const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;

    // Fee Statistics
    const pendingAllocations = students.filter(s => !s.room);
    const pendingHostelFees = students.filter(s => !s.feesPaid);
    const pendingMessFees = students.filter(s => !s.messFeesPaid);

    const printPendingReport = (type, studentList) => {
        const printWindow = window.open('', '_blank');
        const titles = {
            'allocation': 'Pending Room Allocation Report',
            'hostel': 'Pending Hostel Fee Report',
            'mess': 'Pending Mess Fee Report'
        };
        const reportTitle = titles[type];

        const html = `
            <html>
                <head>
                    <title>${reportTitle}</title>
                    <style>
                        body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #18181b; }
                        .header { text-align: center; border-bottom: 2px solid #14b8a6; padding-bottom: 15px; margin-bottom: 25px; }
                        h1 { color: #14b8a6; margin: 0; font-size: 24px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th { background: #f8fafc; border-bottom: 2px solid #e2e8f0; padding: 12px; text-align: left; font-size: 12px; color: #64748b; }
                        td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
                        .footer { margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: right; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>${reportTitle}</h1>
                        <p>Total Records: ${studentList.length}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Year</th>
                                <th>Category</th>
                                ${type === 'allocation' ? '<th>CGPA</th>' : '<th>Status</th>'}
                            </tr>
                        </thead>
                        <tbody>
                            ${studentList.map(s => `
                                <tr>
                                    <td style="font-weight: 600;">${s.name}</td>
                                    <td>${s.email}</td>
                                    <td>Year ${s.year}</td>
                                    <td>${s.category}</td>
                                    <td>${type === 'allocation' ? s.cgpa : '<span style="color: #ef4444;">Pending</span>'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        Generated on ${new Date().toLocaleString()} | MBM Hostel Management System
                    </div>
                    <script>
                        window.onload = () => { window.print(); window.close(); };
                    </script>
                </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Admin Dashboard</h1>
                <p className="subtitle">Overview of hostel operations and statistics.</p>
            </header>

            <div className="grid-4">
                <StatCard title="Total Students" value={students.length} icon={<Users size={24} />} />
                <StatCard title="Occupancy Rate" value={`${occupancyRate}%`} icon={<Home size={24} />} color="var(--secondary)" />
                <StatCard title="Pending Tickets" value={pendingComplaints} icon={<AlertCircle size={24} />} color={pendingComplaints > 0 ? "var(--warning)" : "var(--success)"} />
                <StatCard title="Active Notices" value={notices.length} icon={<FileText size={24} />} color="var(--info)" />
            </div>

            <div className="grid-3">
                <StatCard
                    title="No Allocation"
                    value={pendingAllocations.length}
                    icon={<AlertCircle size={24} />}
                    color="var(--warning)"
                />
                <StatCard
                    title="Unpaid Hostel Fee"
                    value={pendingHostelFees.length}
                    icon={<CreditCard size={24} />}
                    color="var(--danger)"
                />
                <StatCard
                    title="Unpaid Mess Fee"
                    value={pendingMessFees.length}
                    icon={<Utensils size={24} />}
                    color="var(--danger)"
                />
            </div>

            <div className="grid-2" style={{ gap: '2rem' }}>
                <Card style={{ padding: '1.5rem' }}>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Pending Allocation</h2>
                        <Button variant="ghost" size="sm" onClick={() => printPendingReport('allocation', pendingAllocations)}>
                            <Download size={16} style={{ marginRight: '0.5rem' }} /> PDF
                        </Button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {pendingAllocations.slice(0, 5).map(s => (
                            <div key={s.id} className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#fff' }}>{s.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Year {s.year} • {s.gender}</div>
                                </div>
                                <Badge status="info">CGPA: {s.cgpa}</Badge>
                            </div>
                        ))}
                        {pendingAllocations.length > 5 && (
                            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                + {pendingAllocations.length - 5} others pending
                            </div>
                        )}
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Arrears (Hostel & Mess)</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button variant="ghost" size="sm" title="Hostel Fee PDF" onClick={() => printPendingReport('hostel', pendingHostelFees)}>
                                <Download size={16} /> Hostel
                            </Button>
                            <Button variant="ghost" size="sm" title="Mess Fee PDF" onClick={() => printPendingReport('mess', pendingMessFees)}>
                                <Download size={16} /> Mess
                            </Button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {pendingHostelFees.slice(0, 3).map(s => (
                            <div key={`h-${s.id}`} className="flex-between" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#fff' }}>{s.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hostel Fee Pending</div>
                                </div>
                                <Badge status="danger">Arrear</Badge>
                            </div>
                        ))}
                        {pendingMessFees.slice(0, 3).map(s => (
                            <div key={`m-${s.id}`} className="flex-between" style={{ padding: '0.75rem', background: 'rgba(236,72,153,0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(236,72,153,0.1)' }}>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#fff' }}>{s.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mess Fee Pending</div>
                                </div>
                                <Badge status="danger" style={{ background: '#ec4899' }}>Mess</Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Overview;
