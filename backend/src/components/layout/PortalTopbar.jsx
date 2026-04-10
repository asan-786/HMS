import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { Shield, User, LayoutGrid } from 'lucide-react';

const PortalTopbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <header style={{
            height: '70px',
            padding: '0 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-dark)',
            backdropFilter: 'blur(20px)',
            gap: '1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 40
        }}>
            {/* Direct Access Buttons based on current view */}
            <div style={{ marginRight: 'auto', display: 'flex', gap: '1rem' }}>
                <Button variant="ghost" size="sm" onClick={() => navigate('/')} style={{ fontSize: '0.85rem' }}>
                    <LayoutGrid size={16} /> Main Page
                </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {user?.role === 'student' ? (
                    <Button variant="outline" size="sm" onClick={() => navigate('/auth')} style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
                        <Shield size={16} /> Admin Login
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => navigate('/auth')} style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        <User size={16} /> Student Login
                    </Button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-light)' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{user?.name}</p>
                        <p className="subtitle" style={{ margin: 0, fontSize: '0.75rem' }}>{user?.role === 'admin' ? 'Hostel Warden' : `Room: ${user?.room || 'Pending'}`}</p>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}>
                        {user?.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PortalTopbar;
