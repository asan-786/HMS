import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import Button from '../ui/Button';

const Sidebar = ({ links }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0
        }}>
            <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>H</div>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>MBM <span style={{ color: 'var(--primary)' }}>Hostel</span></h2>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p className="subtitle" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Menu</p>

                {links.map((link, idx) => (
                    <NavLink
                        key={idx}
                        to={link.path}
                        end={link.end}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            color: isActive ? '#fff' : 'var(--text-muted)',
                            background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none',
                            fontWeight: isActive ? 500 : 400
                        })}
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                ))}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600 }}>
                        {user?.name.charAt(0)}
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: 500, color: '#fff' }}>{user?.name}</p>
                        <p className="subtitle" style={{ margin: 0, fontSize: '0.8rem' }}>{user?.role === 'admin' ? 'Administrator' : user?.room || 'No Room Assigned'}</p>
                    </div>
                </div>
                <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--danger)' }} onClick={handleLogout}>
                    <LogOut size={18} /> Logout
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
