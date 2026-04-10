import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { FileText, Trash2 } from 'lucide-react';

const NoticeBoard = () => {
    const { notices, addNotice } = useHostel();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [important, setImportant] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        addNotice({ title, content, important });
        setTitle('');
        setContent('');
        setImportant(false);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Notice Board</h1>
                <p className="subtitle">Publish official announcements to all students.</p>
            </header>

            <div className="grid-2" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 2fr)' }}>
                <Card style={{ alignSelf: 'start' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Post New Notice</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Title</label>
                            <input required value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g., Campus Cleaning Schedule" style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Message Content</label>
                            <textarea required value={content} onChange={e => setContent(e.target.value)} rows="5" placeholder="Write your announcement..." style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none', resize: 'vertical' }}></textarea>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: '0.5rem 0' }}>
                            <input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--danger)' }} />
                            <span style={{ fontSize: '0.9rem', color: '#fff' }}>Mark as Important (Urgent)</span>
                        </label>

                        <Button type="submit" variant="primary">Publish Notice</Button>
                    </form>
                </Card>

                <Card style={{ padding: 0 }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                        <h3 style={{ margin: 0 }}>Published Notices</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {notices.length === 0 ? (
                            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No notices published yet.</p>
                        ) : (
                            notices.map(notice => (
                                <div key={notice.id} style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ color: notice.important ? 'var(--danger)' : 'var(--primary)', marginTop: '0.2rem' }}>
                                        <FileText size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 600, color: '#fff', fontSize: '1.1rem' }}>{notice.title}</span>
                                            {notice.important && <Badge status="danger">Important</Badge>}
                                        </div>
                                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                                            {notice.content}
                                        </p>
                                        <div className="flex-between">
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Posted on {notice.date}</span>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem', opacity: 0.7, transition: 'opacity 0.2s' }} aria-label="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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

export default NoticeBoard;
