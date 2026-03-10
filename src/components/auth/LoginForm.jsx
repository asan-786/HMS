import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Lock, Mail } from 'lucide-react';

const LoginForm = ({ title = "Welcome back", subtitle = "Sign in to your MBM Hostel account" }) => {
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

    return (
        <div style={{ width: '100%', maxWidth: '420px' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{title}</h2>
                <p className="subtitle" style={{ fontSize: '0.9rem' }}>{subtitle}</p>
            </div>

            <Card style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)' }}>
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

                    <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                        Sign In to Portal
                    </Button>

                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', marginTop: '0.5rem', paddingTop: '1rem' }}>
                        <p>Demo Admin: admin@hostel.edu (admin123)</p>
                        <p style={{ marginTop: '0.25rem' }}>Demo Student: student@college.edu (student123)</p>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;
