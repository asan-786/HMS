import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    // Let's use standard classes and define them in global.css if needed, or inline styles
    const getStyle = () => {
        switch (variant) {
            case 'primary': return { background: 'var(--primary)', color: '#fff', border: 'none' };
            case 'secondary': return { background: 'var(--secondary)', color: '#fff', border: 'none' };
            case 'outline': return { background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-main)' };
            case 'ghost': return { background: 'transparent', border: 'none', color: 'var(--text-muted)' };
            default: return {};
        }
    };

    return (
        <button
            className={`btn ${variant} ${className}`}
            style={{
                padding: '0.8rem 1.6rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-sans)',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                ...getStyle(),
                ...props.style
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
