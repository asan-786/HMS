import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { User, Mail, Lock, ArrowRight, Hash, Phone } from 'lucide-react';

const RegisterForm = ({ onToggle }) => {
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [studentID, setStudentID] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        const success = register(name, email, password, role, studentID, phone);
        if (success) {
            navigate(role === 'admin' ? '/admin' : '/student');
        } else {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '480px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
                        <User size={32} />
                    </div>
                </div>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Account</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Join the Hostel Management System</p>
            </div>

            <Card style={{ background: 'rgba(22, 25, 33, 0.6)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem' }}>
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Role Switcher */}
                    <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem', borderRadius: 'var(--radius-md)', gap: '0.4rem' }}>
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', background: role === 'student' ? 'var(--primary)' : 'transparent', color: role === 'student' ? '#fff' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: 'none', background: role === 'admin' ? 'var(--primary)' : 'transparent', color: role === 'admin' ? '#fff' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            Admin
                        </button>
                    </div>

                    {error && (
                        <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: role === 'student' ? '1fr 1fr' : '1fr', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#e5e7eb' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        {role === 'student' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#e5e7eb' }}>Student ID</label>
                                <div style={{ position: 'relative' }}>
                                    <Hash size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="S12345"
                                        value={studentID}
                                        onChange={(e) => setStudentID(e.target.value)}
                                        style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '0.95rem', outline: 'none' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#e5e7eb' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                required
                                placeholder="name@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '0.95rem', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#e5e7eb' }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="tel"
                                required
                                placeholder="+1 234 567 890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '0.95rem', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#e5e7eb' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', color: '#f3f4f6', fontSize: '0.95rem', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '1rem', 
                            borderRadius: 'var(--radius-md)', 
                            border: 'none', 
                            background: 'linear-gradient(135deg, var(--primary) 0%, #d946ef 100%)', 
                            color: '#fff', 
                            fontSize: '1rem', 
                            fontWeight: 600, 
                            cursor: 'pointer',
                            marginTop: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        Create {role === 'admin' ? 'Admin' : 'Student'} Account
                    </button>

                    <div style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        Already have an account? <button type="button" onClick={onToggle} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, marginLeft: '0.25rem' }}>Log In</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RegisterForm;
