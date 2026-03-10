import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`glass-card ${className}`}
            style={{
                padding: '1.5rem',
                width: '100%',
                ...props.style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
