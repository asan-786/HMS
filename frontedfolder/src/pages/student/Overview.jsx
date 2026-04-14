import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHostel } from '../../context/HostelContext';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Utensils, Zap, BookOpen, AlertCircle } from 'lucide-react';

const Overview = () => {
    const { user } = useAuth();
    const { notices, messMenu } = useHostel();

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Support nested structure (gender -> year -> day)
    const gender = user?.gender || 'Boys';
    const year = user?.year || 1;
    const userMenu = messMenu[gender]?.[year] || messMenu;
    const todaysMenu = userMenu[today] || userMenu['Monday'] || {};

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Overview</h1>
                <p className="subtitle">Welcome back, {user?.name}. Here's what's happening today.</p>
            </header>

            <div className="grid-4" style={{ marginBottom: '1rem' }}>
                <StatCard title="Current Room" value={user?.room || "Unassigned"} icon={<BookOpen size={24} />} />
                <StatCard title="CGPA" value={user?.cgpa || "N/A"} icon={<Zap size={24} />} color="var(--secondary)" />
                <StatCard title="Hostel Fees" value={user?.feesPaid ? "Paid" : "Due"} icon={<AlertCircle size={24} />} color={user?.feesPaid ? "var(--success)" : "var(--danger)"} />
                <StatCard title="Mess Status" value="Enrolled" icon={<Utensils size={24} />} color="var(--info)" />
            </div>

            <div className="grid-2">
                <Card>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Utensils size={20} color="var(--primary)" /> Today's Menu: {today}</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                            <p className="subtitle" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Breakfast</p>
                            <p style={{ fontWeight: 500 }}>{todaysMenu.breakfast}</p>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--secondary)' }}>
                            <p className="subtitle" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Lunch</p>
                            <p style={{ fontWeight: 500 }}>{todaysMenu.lunch}</p>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--info)' }}>
                            <p className="subtitle" style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Dinner</p>
                            <p style={{ fontWeight: 500 }}>{todaysMenu.dinner}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={20} color="var(--secondary)" /> Recent Notices</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {notices.slice(0, 3).map(notice => (
                            <div key={notice.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 500, color: '#fff' }}>{notice.title}</span>
                                    {notice.important && <Badge status="danger">Urgent</Badge>}
                                </div>
                                <p className="subtitle" style={{ fontSize: '0.85rem' }}>{notice.content}</p>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>
                                    {notice.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Overview;
