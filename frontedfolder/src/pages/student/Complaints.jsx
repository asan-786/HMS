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

    // ✅ SAFE DATA
    const safeComplaints = Array.isArray(complaints) ? complaints : [];

    // ✅ FILTER SAFE
    const myComplaints = safeComplaints.filter(c =>
        c.studentName === user?.name || c.room === user?.room
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!desc.trim()) return;

        const complaintData = {
            subject: category ? `${category} Issue` : "General Issue", // ✅ required
            type: category || "General",                                // ✅ required
            description: desc,                                          // ✅ required
            studentName: user?.name,
            room: user?.room || "Not Assigned"  
        };

        console.log("SENDING DATA:", complaintData); // 🔥 debug

        addComplaint(complaintData);

        setDesc('');
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Complaints</h1>
                <p className="subtitle">Raise tickets for maintenance or hostel issues.</p>
            </header>

            <div className="grid-2" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 2fr)' }}>
                
                {/* ✅ FORM */}
                <Card style={{ alignSelf: 'start' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>New Ticket</h3>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>

                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            >
                                  {/* value={category} onChange={e => setCategory(e.target.value)}> */}

    {/* <option value="Electric">Electrical</option>  
    <option value="Plumbing">Plumbing</option>
    <option value="Carpentry">Carpentry</option>
    <option value="Internet">Internet</option>
    <option value="Cleanliness">Cleanliness</option>
    <option value="Other">Other</option> */}


     <option value="Maintenance">Electrical</option>   ✅ FIX
    <option value="Maintenance">Plumbing</option>     {/* optional same group */}
    <option value="Maintenance">Carpentry</option>    {/* optional */}
    
    <option value="Mess">Mess</option>
    <option value="Cleanliness">Cleanliness</option>
    <option value="Security">Security</option>
    <option value="Other">Other</option>


</select> 
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>

                            <textarea
                                required
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                rows="4"
                                placeholder="Detail the issue..."
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#fff'
                                }}
                            />
                        </div>

                        <Button type="submit" variant="primary">
                            Submit Complaint
                        </Button>

                    </form>
                </Card>

                {/* ✅ LIST */}
                <Card style={{ padding: 0 }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                        <h3 style={{ margin: 0 }}>My Tickets</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        
                        {myComplaints.length === 0 ? (
                            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                No complaints recorded yet.
                            </p>
                        ) : (
                            myComplaints.map((ticket, index) => (
                                
                                // ✅ FIXED KEY HERE
                                <div key={ticket._id || ticket.id || index} style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                                    
                                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                        
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <span style={{ fontWeight: 600 }}>
                                                Ticket #{ticket._id?.slice(-5) || index}
                                            </span>

                                            <span className="subtitle">
                                                • {ticket.type || ticket.category}
                                            </span>
                                        </div>

                                        <Badge status={ticket.status === 'Resolved' ? 'success' : 'warning'}>
                                            {ticket.status || "Pending"}
                                        </Badge>
                                    </div>

                                    <p style={{ marginBottom: '1rem' }}>
                                        {ticket.description}
                                    </p>

                                    {ticket.adminReply && (
                                        <div style={{
                                            padding: '1rem',
                                            background: 'rgba(59, 130, 246, 0.05)',
                                            borderLeft: '3px solid var(--primary)'
                                        }}>
                                            <b>Warden Reply:</b>
                                            <p>{ticket.adminReply}</p>
                                        </div>
                                    )}

                                    <div style={{ fontSize: '0.75rem', color: 'gray' }}>
                                        {ticket.createdAt
                                            ? new Date(ticket.createdAt).toLocaleDateString()
                                            : "No date"}
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