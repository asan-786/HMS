import React from 'react';

const Badge = ({ children, status }) => {
    const getStyle = () => {
        switch (status?.toLowerCase()) {
            case 'success':
            case 'resolved':
            case 'paid':
                return { bg: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.3)' };
            case 'warning':
            case 'pending':
                return { bg: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.3)' };
            case 'danger':
            case 'unpaid':
                return { bg: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.3)' };
            case 'info':
                return { bg: 'rgba(59, 130, 246, 0.15)', color: 'var(--info)', border: '1px solid rgba(59, 130, 246, 0.3)' };
            default:
                return { bg: 'rgba(156, 163, 175, 0.15)', color: 'var(--text-main)', border: '1px solid rgba(156, 163, 175, 0.3)' };
        }
    };

    const style = getStyle();

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            backgroundColor: style.bg,
            color: style.color,
            border: style.border
        }}>
            {children}
        </span>
    );
};

export default Badge;
