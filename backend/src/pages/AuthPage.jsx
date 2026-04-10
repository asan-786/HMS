import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import RegisterForm from '../components/auth/RegisterForm';
import { Lock, Mail, ArrowLeft, LogIn } from 'lucide-react';

const AuthPage = () => {
    const location = useLocation();
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState(location.state?.view || 'login'); 
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (success) {
            navigate(role === 'admin' ? '/admin' : '/student');
        } else {
            setError('Invalid credentials. Try guest@test.com / password123');
        }
    };

    if (view === 'register') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '1rem' }}>
                <RegisterForm onToggle={() => setView('login')} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '480px' }} className="animate-fade-in">
                
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '1.25rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>
                            <LogIn size={36} />
                        </div>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff', letterSpacing: '-0.025em' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Log in to your HMS account</p>
                </div>

                <Card style={{ background: 'rgba(22, 25, 33, 0.6)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2.5rem' }}>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                        
                        {/* Role Switcher */}
                        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem', borderRadius: 'var(--radius-md)', gap: '0.4rem' }}>
                            <button
                                type="button"
                                onClick={() => setRole('student')}
                                style={{ flex: 1, padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: 'none', background: role === 'student' ? 'var(--primary)' : 'transparent', color: role === 'student' ? '#fff' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                style={{ flex: 1, padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: 'none', background: role === 'admin' ? 'var(--primary)' : 'transparent', color: role === 'admin' ? '#fff' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                Admin
                            </button>
                        </div>

                        {error && (
                            <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: '#e5e7eb' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    required
                                    placeholder="student@test.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ width: '100%', padding: '1rem 1.25rem 1rem 3.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: '#e5e7eb' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ width: '100%', padding: '1rem 1.25rem 1rem 3.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            style={{ 
                                width: '100%', 
                                padding: '1.15rem', 
                                borderRadius: 'var(--radius-md)', 
                                border: 'none', 
                                background: 'linear-gradient(135deg, var(--primary) 0%, #d946ef 100%)', 
                                color: '#fff', 
                                fontSize: '1.1rem', 
                                fontWeight: 600, 
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                marginTop: '0.5rem'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Sign In
                        </button>

                        <div style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-muted)' }}>
                            Don't have an account? <button type="button" onClick={() => setView('register')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, marginLeft: '0.35rem' }}>Register here</button>
                        </div>
                    </form>
                </Card>

                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <button 
                        onClick={() => navigate('/')} 
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                    >
                        <ArrowLeft size={18} /> Back to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
