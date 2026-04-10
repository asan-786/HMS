import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, CreditCard, Utensils, CheckCircle, XCircle, Settings, Save } from 'lucide-react';

const FeeManagement = () => {
    const { students, updateStudentFeeStatus, feeConfig, updateFeeConfig } = useHostel();
    const [searchTerm, setSearchTerm] = useState('');
    const [tempConfig, setTempConfig] = useState(feeConfig);
    const [isEditingConfig, setIsEditingConfig] = useState(false);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.room && student.room.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleToggleFee = (studentId, type, currentStatus) => {
        updateStudentFeeStatus(studentId, type, !currentStatus);
    };

    const handleSaveConfig = () => {
        updateFeeConfig(tempConfig);
        setIsEditingConfig(false);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header className="flex-between">
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Fee Management</h1>
                    <p className="subtitle">Configure fee rates and manage student payment statuses.</p>
                </div>
            </header>

            {/* Global Fee Configuration */}
            <Card style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Settings size={20} color="var(--primary)" />
                        <h3 style={{ margin: 0 }}>Fee Configuration</h3>
                    </div>
                    {isEditingConfig ? (
                        <Button size="sm" onClick={handleSaveConfig} style={{ gap: '0.5rem' }}>
                            <Save size={16} /> Save Changes
                        </Button>
                    ) : (
                        <Button variant="ghost" size="sm" onClick={() => setIsEditingConfig(true)} style={{ gap: '0.5rem' }}>
                            <Settings size={16} /> Edit Rates
                        </Button>
                    )}
                </div>

                <div className="grid-4" style={{ gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Single Room (Yearly)</label>
                        <input
                            type="number"
                            readOnly={!isEditingConfig}
                            value={tempConfig.singleRoomHostel}
                            onChange={(e) => setTempConfig({ ...tempConfig, singleRoomHostel: parseInt(e.target.value) })}
                            style={{
                                width: '100%',
                                padding: '0.6rem',
                                borderRadius: 'var(--radius-md)',
                                background: isEditingConfig ? 'rgba(255,255,255,0.05)' : 'transparent',
                                border: `1px solid ${isEditingConfig ? 'var(--primary)' : 'var(--border-light)'}`,
                                color: '#fff',
                                fontWeight: 600
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Standard Room (Yearly)</label>
                        <input
                            type="number"
                            readOnly={!isEditingConfig}
                            value={tempConfig.standardRoomHostel}
                            onChange={(e) => setTempConfig({ ...tempConfig, standardRoomHostel: parseInt(e.target.value) })}
                            style={{
                                width: '100%',
                                padding: '0.6rem',
                                borderRadius: 'var(--radius-md)',
                                background: isEditingConfig ? 'rgba(255,255,255,0.05)' : 'transparent',
                                border: `1px solid ${isEditingConfig ? 'var(--primary)' : 'var(--border-light)'}`,
                                color: '#fff',
                                fontWeight: 600
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Girls Mess (Monthly)</label>
                        <input
                            type="number"
                            readOnly={!isEditingConfig}
                            value={tempConfig.girlsMess}
                            onChange={(e) => setTempConfig({ ...tempConfig, girlsMess: parseInt(e.target.value) })}
                            style={{
                                width: '100%',
                                padding: '0.6rem',
                                borderRadius: 'var(--radius-md)',
                                background: isEditingConfig ? 'rgba(255,255,255,0.05)' : 'transparent',
                                border: `1px solid ${isEditingConfig ? 'var(--primary)' : 'var(--border-light)'}`,
                                color: '#fff',
                                fontWeight: 600
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Boys Mess (Monthly)</label>
                        <input
                            type="number"
                            readOnly={!isEditingConfig}
                            value={tempConfig.boysMess}
                            onChange={(e) => setTempConfig({ ...tempConfig, boysMess: parseInt(e.target.value) })}
                            style={{
                                width: '100%',
                                padding: '0.6rem',
                                borderRadius: 'var(--radius-md)',
                                background: isEditingConfig ? 'rgba(255,255,255,0.05)' : 'transparent',
                                border: `1px solid ${isEditingConfig ? 'var(--primary)' : 'var(--border-light)'}`,
                                color: '#fff',
                                fontWeight: 600
                            }}
                        />
                    </div>
                </div>
            </Card>

            {/* Student List */}
            <div>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Student Status Management</h3>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search
                            size={18}
                            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                        />
                        <input
                            type="text"
                            placeholder="Find student..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-light)',
                                color: '#fff',
                                fontSize: '0.85rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <Card style={{ padding: 0, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Student</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Hostel Fee</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Mess Fee</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'right' }}>Update Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ fontWeight: 600, color: '#fff' }}>{student.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{student.room || 'No Room'}</div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <Badge status={student.feesPaid ? 'success' : 'danger'}>
                                            {student.feesPaid ? 'Paid' : 'Unpaid'}
                                        </Badge>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <Badge status={student.messFeesPaid ? 'success' : 'danger'}>
                                            {student.messFeesPaid ? 'Paid' : 'Unpaid'}
                                        </Badge>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <Button 
                                                variant={student.feesPaid ? "ghost" : "primary"} 
                                                size="sm"
                                                onClick={() => handleToggleFee(student.id, 'hostel', student.feesPaid)}
                                                style={{ fontSize: '0.75rem', minWidth: '100px' }}
                                            >
                                                Hostel: {student.feesPaid ? 'Unpaid' : 'Paid'}
                                            </Button>
                                            <Button 
                                                variant={student.messFeesPaid ? "ghost" : "secondary"} 
                                                size="sm"
                                                onClick={() => handleToggleFee(student.id, 'mess', student.messFeesPaid)}
                                                style={{ fontSize: '0.75rem', minWidth: '100px' }}
                                            >
                                                Mess: {student.messFeesPaid ? 'Unpaid' : 'Paid'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default FeeManagement;
