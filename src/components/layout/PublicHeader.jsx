import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const PublicHeader = () => {
    const navigate = useNavigate();

    return (
        <nav style={{
            padding: '1.25rem 5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-light)',
            background: 'rgba(15, 17, 21, 0.9)',
            backdropFilter: 'blur(15px)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>H</div>
                <h2 style={{ margin: 0, fontSize: '1.4rem' }}>MBM <span style={{ color: 'var(--primary)' }}>Hostel</span></h2>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
                <Button variant="ghost" size="sm" onClick={() => {
                    if (window.location.pathname === '/') {
                        const loginSection = document.getElementById('login-section');
                        loginSection?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        navigate('/auth');
                    }
                }}>Student Login</Button>

                <Button variant="secondary" size="sm" onClick={() => {
                    if (window.location.pathname === '/') {
                        const loginSection = document.getElementById('login-section');
                        loginSection?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        navigate('/auth');
                    }
                }}>Admin Login</Button>
            </div>
        </nav>
    );
};

export default PublicHeader;
