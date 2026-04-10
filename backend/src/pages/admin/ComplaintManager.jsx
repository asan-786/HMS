import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search } from 'lucide-react';

const ComplaintManager = () => {
    const { complaints, resolveComplaint } = useHostel();
    const [filter, setFilter] = useState('All');
    const [activeReply, setActiveReply] = useState(null);
    const [replyText, setReplyText] = useState('');

    const filteredComplaints = complaints.filter(c => {
        if (filter === 'Pending') return c.status === 'Pending';
        if (filter === 'Resolved') return c.status === 'Resolved';
        return true;
    });

    const handleResolve = (id) => {
        if (!replyText.trim()) return;
        resolveComplaint(id, replyText);
        setActiveReply(null);
        setReplyText('');
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header className="flex-between" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Complaint Manager</h1>
                    <p className="subtitle">Review and resolve student maintenance tickets.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['All', 'Pending', 'Resolved'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--border-light)',
                                background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: filter === f ? '#fff' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: 500,
                                fontSize: '0.85rem'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredComplaints.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No complaints found for "{filter}".</p>
                    </Card>
                ) : (
                    filteredComplaints.map(ticket => (
                        <Card key={ticket.id} style={{ borderLeft: `4px solid ${ticket.status === 'Resolved' ? 'var(--success)' : 'var(--warning)'}` }}>
                            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '1.1rem' }}>Ticket #{ticket.id}</span>
                                    <Badge status={ticket.status === 'Resolved' ? 'success' : 'warning'}>{ticket.status}</Badge>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    {ticket.studentName} ({ticket.room}) • {ticket.date}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Badge>{ticket.category}</Badge>
                            </div>

                            <p style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                                {ticket.description}
                            </p>

                            {ticket.status === 'Resolved' ? (
                                <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid var(--primary)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Your Reply:</span>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#fff' }}>{ticket.reply}</p>
                                </div>
                            ) : (
                                activeReply === ticket.id ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                                        <textarea
                                            autoFocus
                                            required
                                            value={replyText}
                                            onChange={e => setReplyText(e.target.value)}
                                            rows="3"
                                            placeholder="Type your resolution reply to the student..."
                                            style={{ padding: '0.75rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none', resize: 'vertical' }}
                                        ></textarea>
                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                            <Button variant="ghost" onClick={() => setActiveReply(null)}>Cancel</Button>
                                            <Button variant="primary" onClick={() => handleResolve(ticket.id)}>Mark as Resolved</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button variant="outline" onClick={() => setActiveReply(ticket.id)}>
                                        Reply & Resolve
                                    </Button>
                                )
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ComplaintManager;
