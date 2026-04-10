import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const Complaints = () => {
    const { user } = useAuth();
    const { complaints, addComplaint } = useHostel();
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Electrical');

    const myComplaints = complaints.filter(c => c.studentName === user?.name || c.room === user?.room);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!desc.trim()) return;
        addComplaint({ studentName: user.name, room: user.room, category, description: desc });
        setDesc('');
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Complaints</h1>
                <p className="subtitle">Raise tickets for maintenance or hostel issues.</p>
            </header>

            <div className="grid-2" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 2fr)' }}>
                <Card style={{ alignSelf: 'start' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>New Ticket</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }}>
                                <option value="Electrical" style={{ background: 'var(--bg-card)' }}>Electrical</option>
                                <option value="Plumbing" style={{ background: 'var(--bg-card)' }}>Plumbing</option>
                                <option value="Carpentry" style={{ background: 'var(--bg-card)' }}>Carpentry</option>
                                <option value="Internet" style={{ background: 'var(--bg-card)' }}>Internet/WiFi</option>
                                <option value="Cleanliness" style={{ background: 'var(--bg-card)' }}>Cleanliness</option>
                                <option value="Other" style={{ background: 'var(--bg-card)' }}>Other</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                            <textarea required value={desc} onChange={e => setDesc(e.target.value)} rows="4" placeholder="Detail the issue..." style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none', resize: 'vertical' }}></textarea>
                        </div>
                        <Button type="submit" variant="primary" style={{ marginTop: '0.5rem' }}>Submit Ticket</Button>
                    </form>
                </Card>

                <Card style={{ padding: 0 }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                        <h3 style={{ margin: 0 }}>My Tickets</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {myComplaints.length === 0 ? (
                            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No complaints recorded yet.</p>
                        ) : (
                            myComplaints.map(ticket => (
                                <div key={ticket.id} style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ fontWeight: 600, color: '#fff' }}>Ticket #{ticket.id}</span>
                                            <span className="subtitle">• {ticket.category}</span>
                                        </div>
                                        <Badge status={ticket.status === 'Resolved' ? 'success' : 'warning'}>{ticket.status}</Badge>
                                    </div>
                                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1rem' }}>{ticket.description}</p>

                                    {ticket.reply && (
                                        <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid var(--primary)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Warden Reply:</span>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#fff' }}>{ticket.reply}</p>
                                        </div>
                                    )}

                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                                        Submitted on {ticket.date}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Complaints;
