import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { Shield, User } from 'lucide-react';

const QuickPortalSwitcher = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '25px',
            zIndex: 1000,
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            background: 'rgba(15, 17, 21, 0.4)',
            backdropFilter: 'blur(15px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', paddingRight: '1rem', borderRight: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{user?.name}</span>
                <span className="subtitle" style={{ fontSize: '0.7rem' }}>{user?.role === 'admin' ? 'Hostel Warden' : `Room ${user?.room}`}</span>
            </div>

            {user?.role === 'student' ? (
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')} style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
                    <Shield size={14} /> Admin Login
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')} style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                    <User size={14} /> Student Login
                </Button>
            )}
        </div>
    );
};

export default QuickPortalSwitcher;
