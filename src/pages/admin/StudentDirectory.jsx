import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Search, UserSearch } from 'lucide-react';

const StudentDirectory = () => {
    const { students } = useHostel();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(student => {
        const query = searchTerm.toLowerCase();
        const roomName = student.room ? student.room.toLowerCase() : 'unassigned';
        return (
            student.name.toLowerCase().includes(query) ||
            roomName.includes(query)
        );
    });

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header className="flex-between" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Student Directory</h1>
                    <p className="subtitle">View all registered students and their details.</p>
                </div>

                <div style={{ position: 'relative', width: '300px' }}>
                    <Search
                        size={18}
                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                    />
                    <input
                        type="text"
                        placeholder="Search student name or room..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-light)',
                            color: '#fff',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'all 0.2s'
                        }}
                    />
                </div>
            </header>

            <Card style={{ padding: 0, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Name</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Room</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>CGPA</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Category</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Fees</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Mess</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ fontWeight: 600, color: '#fff' }}>{student.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{student.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: student.room ? 'var(--primary)' : 'var(--text-muted)' }}>
                                        {student.room || 'Unassigned'}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#fff' }}>{student.cgpa.toFixed(2)}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{student.category}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <Badge status={student.feesPaid ? 'success' : 'danger'}>{student.feesPaid ? 'Paid' : 'Due'}</Badge>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <Badge status={student.messEnrolled ? 'info' : 'default'}>{student.messEnrolled ? 'Enrolled' : 'Opt-out'}</Badge>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <UserSearch size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                    <p>No students found matching "{searchTerm}"</p>
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
