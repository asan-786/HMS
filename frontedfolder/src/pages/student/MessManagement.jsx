import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Utensils, CheckCircle } from 'lucide-react';

const MessManagement = () => {
    const { user } = useAuth();
    const { messMenu } = useHostel();

    // Support nested structure (gender -> year -> day)
    const gender = user?.gender || 'Boys';
    const year = user?.year || 1;

    // Ensure we get a day-indexed object
    let userMenu = messMenu[gender]?.[year];
    if (!userMenu || userMenu.Boys || userMenu.Girls) {
        userMenu = messMenu.Boys?.[1] || {};
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter(d => userMenu[d]);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header className="flex-between">
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Mess Menu</h1>
                    <p className="subtitle">View this week's meal schedule and manage your enrollment.</p>
                </div>
                <Card style={{ padding: '1rem 1.5rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)' }}>
                    <CheckCircle color="var(--success)" size={24} />
                    <div>
                        <span style={{ fontWeight: 600, color: '#fff', display: 'block' }}>Enrolled</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>Valid till EoS</span>
                    </div>
                </Card>
            </header>

            <Card style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Breakfast</h4>
                    <p style={{ fontWeight: 600, color: '#fff', fontSize: '1.1rem' }}>08:00 AM - 09:00 AM</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '0.25rem' }}>(Strictly Follow timing)</p>
                </div>
                <div style={{ width: '1px', height: '50px', background: 'var(--border-light)' }}></div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Lunch</h4>
                    <p style={{ fontWeight: 600, color: '#fff', fontSize: '1.1rem' }}>12:45 PM - 02:15 PM</p>
                </div>
                <div style={{ width: '1px', height: '50px', background: 'var(--border-light)' }}></div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Dinner</h4>
                    <p style={{ fontWeight: 600, color: '#fff', fontSize: '1.1rem' }}>08:00 PM - 09:30 PM</p>
                </div>
            </Card>

            <div className="grid-2">
                {days.map(day => (
                    <Card key={day} style={{ padding: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                            <Utensils size={18} /> {day}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                                <div style={{ minWidth: 100 }}>
                                    <span className="subtitle" style={{ display: 'block', marginBottom: '0.1rem', color: 'var(--primary)' }}>Breakfast</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>08:00 - 09:00 AM</span>
                                </div>
                                <span style={{ fontWeight: 500, color: '#fff', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, paddingLeft: '1rem' }}>{userMenu[day].breakfast}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                                <div style={{ minWidth: 100 }}>
                                    <span className="subtitle" style={{ display: 'block', marginBottom: '0.1rem', color: 'var(--primary)' }}>Lunch</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>12:45 - 02:15 PM</span>
                                </div>
                                <div style={{ fontWeight: 500, color: '#fff', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', flex: 1, paddingLeft: '1rem', gap: '0.2rem' }}>
                                    {userMenu[day].lunch.split('|OR|').map((option, idx, arr) => (
                                        <React.Fragment key={idx}>
                                            <span>{option.trim()}</span>
                                            {idx < arr.length - 1 && <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 700, margin: '0.2rem 0' }}>— OR —</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ minWidth: 100 }}>
                                    <span className="subtitle" style={{ display: 'block', marginBottom: '0.1rem', color: 'var(--primary)' }}>Dinner</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>08:00 - 09:30 PM</span>
                                </div>
                                <span style={{ fontWeight: 500, color: '#fff', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, paddingLeft: '1rem' }}>{userMenu[day].dinner}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MessManagement;
