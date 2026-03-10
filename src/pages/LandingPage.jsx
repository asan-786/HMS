import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Home, TrendingUp, Bell, MessageSquare, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <Home size={24} />, title: "Smart Room Allocation", desc: "Automated CGPA & category-based room assignment algorithm." },
        { icon: <MessageSquare size={24} />, title: "Complaint Tracking", desc: "Real-time ticket raising and resolution status updates." },
        { icon: <Users size={24} />, title: "Student Directory", desc: "Comprehensive profiles with fee and mess statuses." },
        { icon: <Bell size={24} />, title: "Instant Notices", desc: "Digital notice board for important campus announcements." },
        { icon: <TrendingUp size={24} />, title: "Fee Management", desc: "Clear dashboard for hostel and mess fee dues." },
        { icon: <Shield size={24} />, title: "Admin Portal", desc: "Powerful tools for wardens to manage the entire hostel." }
    ];

    const stats = [
        { value: "500+", label: "Students" },
        { value: "120", label: "Rooms" },
        { value: "100%", label: "Digital" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation */}
            <nav style={{ padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', background: 'rgba(15, 17, 21, 0.9)', backdropFilter: 'blur(15px)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>H</div>
                    <h2 style={{ margin: 0, fontSize: '1.4rem' }}>MBM <span style={{ color: 'var(--primary)' }}>Hostel</span></h2>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>Student Login</Button>
                    <Button variant="secondary" size="sm" onClick={() => navigate('/auth')}>Admin Login</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ padding: '6rem 5%', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="animate-slide-up">
                <Badge status="success">Smart Platform</Badge>
                <h1 style={{ fontSize: '4rem', maxWidth: '800px', margin: '1.5rem auto', lineHeight: 1.1 }}>
                    The Next Generation <br />
                    <span className="text-gradient">Hostel Management</span>
                </h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    A premium, intelligent platform to automate room allocations, resolve complaints faster, and unify campus living.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }} onClick={() => navigate('/auth')}>
                        Enter Portal <ArrowRight size={20} />
                    </Button>
                </div>

                {/* Stats Bar */}
                <div style={{ display: 'flex', gap: '4rem', marginTop: '5rem', padding: '2rem 4rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.2rem' }}>{s.value}</h3>
                            <p className="subtitle">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '5rem 5%', background: 'var(--bg-card)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Everything you need.</h2>
                    <p className="subtitle">Built for wardens and students alike.</p>
                </div>
                <div className="grid-3" style={{ gap: '2rem' }}>
                    {features.map((f, i) => (
                        <Card key={i} className={`animate-slide-up stagger-${(i % 3) + 1}`}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.1)', width: 48, height: 48, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{f.title}</h3>
                            <p className="subtitle" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{f.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 5%', textAlign: 'center', borderTop: '1px solid var(--border-light)', background: 'var(--bg-dark)' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Ready to transform your hostel?</h2>
                <Button variant="secondary" onClick={() => navigate('/auth')} style={{ padding: '0.8rem 2.5rem' }}>Sign In Now</Button>
                <p style={{ marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2026 MBM Hostel Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
