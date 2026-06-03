import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const ComplaintManager = () => {
    const { complaints, resolveComplaint } = useHostel();

    const [filter, setFilter] = useState('All');
    const [activeReply, setActiveReply] = useState(null);
    const [replyText, setReplyText] = useState('');

    // ✅ SAFE ARRAY
    const safeComplaints = Array.isArray(complaints) ? complaints : [];

    const filteredComplaints = safeComplaints.filter(c => {
        if (filter === 'Pending') return c.status === 'Pending';
        if (filter === 'Resolved') return c.status === 'Resolved';
        return true;
    });

    const handleResolve = (id) => {
        if (!replyText.trim()) return;

        resolveComplaint(id, replyText); // ✅ pass reply

        setActiveReply(null);
        setReplyText('');
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* HEADER */}
            <header className="flex-between" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Complaint Manager</h1>
                    <p className="subtitle">Review and resolve student complaints</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['All', 'Pending', 'Resolved'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid #ccc',
                                background: filter === f ? '#2563eb' : '#222',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            {/* LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {filteredComplaints.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '2rem' }}>
                        No complaints found
                    </Card>
                ) : (
                    filteredComplaints.map((ticket, index) => (

                        <Card key={ticket._id || index}>

                            {/* TOP */}
                            <div className="flex-between" style={{ marginBottom: '10px' }}>
                                <div>
                                    <b>Ticket #{ticket._id?.slice(-5) || index}</b>

                                    <Badge
                                        status={
                                            ticket.status === "Resolved"
                                                ? "success"
                                                : ticket.status === "In Progress"
                                                ? "info"
                                                : "warning"
                                        }
                                    >
                                        {ticket.status}
                                    </Badge>
                                </div>

                                <div style={{ fontSize: '12px' }}>
                                    {ticket.studentName} ({ticket.room || "N/A"})
                                </div>
                            </div>

                            {/* TYPE */}
                            <Badge>{ticket.type}</Badge>

                            {/* DESCRIPTION */}
                            <p style={{ margin: '10px 0' }}>
                                {ticket.description}
                            </p>

                            {/* RESOLVED VIEW */}
                            {ticket.status === "Resolved" ? (
                                <div style={{ background: '#111', padding: '10px' }}>
                                    <b>Reply:</b>
                                    <p>{ticket.adminReply}</p>
                                </div>
                            ) : (

                                activeReply === ticket._id ? (

                                    <div>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write reply..."
                                            rows={3}
                                            style={{ width: '100%', marginBottom: '10px' }}
                                        />

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button onClick={() => handleResolve(ticket._id)}>
                                                Resolve
                                            </Button>

                                            <Button onClick={() => setActiveReply(null)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>

                                ) : (

                                    <Button onClick={() => setActiveReply(ticket._id)}>
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