import React from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Bell, FileText } from 'lucide-react';

const Notices = () => {
    const { notices } = useHostel();

    // ✅ SAFE DATA
    const safeNotices = Array.isArray(notices) ? notices : [];

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Notice Board</h1>
                <p className="subtitle">Official announcements and updates from the Warden's Desk.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                
                {safeNotices.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '3rem' }}>
                        <Bell size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                        <p style={{ color: 'var(--text-muted)' }}>No notices at this time.</p>
                    </Card>
                ) : (
                    safeNotices.map((notice, index) => (
                        
                        // ✅ FIXED KEY HERE
                        <Card key={notice._id || notice.id || index} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            
                            <div style={{
                                padding: '1rem',
                                background: notice.important
                                    ? 'rgba(239, 68, 68, 0.1)'
                                    : 'rgba(59, 130, 246, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                color: notice.important ? 'var(--danger)' : 'var(--info)'
                            }}>
                                {notice.important ? <Bell size={24} /> : <FileText size={24} />}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                    
                                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
                                        {notice.title || "No Title"}
                                    </h3>

                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        {notice.important && <Badge status="danger">Important</Badge>}
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            {notice.date || "No Date"}
                                        </span>
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>
                                    {notice.content || "No content available"}
                                </p>
                                  {notice.pdf && (
    <a
      href={`https://hms-w6eu.onrender.com/uploads/${notice.pdf}`}
      target="_blank"
      rel="noreferrer"
    >
      📄 View PDF
    </a>
  )}
                            </div>

                        </Card>
                    ))
                )}

            </div>
        </div>
    );
};

export default Notices;