import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Lock, Mail, ArrowLeft } from 'lucide-react';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (success) {
            if (email.includes('admin')) {
                navigate('/admin');
            } else {
                navigate('/student');
            }
        } else {
            setError('Invalid credentials. Try admin@hostel.edu or student@college.edu.');
        }
    };

    const fillDemo = (role) => {
        if (role === 'admin') {
            setEmail('admin@hostel.edu');
            setPassword('admin123');
        } else {
            setEmail('student@college.edu');
            setPassword('student123');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-in">

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 auto 1.5rem', boxShadow: 'var(--shadow-glow)' }}>H</div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome back</h2>
                    <p className="subtitle">Sign in to your MBM Hostel account</p>
                </div>

                <Card style={{ padding: '2rem' }}>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {error && (
                            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--danger)', fontSize: '0.85rem' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    autoFocus
                                    required
                                    placeholder="e.g. admin@hostel.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <Button type="submit" variant="primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', background: '#3b82f6' }}>
                            Sign In
                        </Button>

                        <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <p style={{ marginBottom: '0.5rem' }}>Click to auto-fill:</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <button type="button" onClick={() => fillDemo('admin')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}>Admin Demo</button>
                                <button type="button" onClick={() => fillDemo('student')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}>Student Demo</button>
                            </div>
                        </div>
                    </form>
                </Card>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                        <ArrowLeft size={16} /> Back to Home Page
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
