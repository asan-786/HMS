import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon, trend, color = 'var(--primary)' }) => {
    return (
        <Card className="animate-slide-up hover-tilt">
            <div className="flex-between">
                <div>
                    <p className="subtitle" style={{ marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {title}
                    </p>
                    <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>
                        {value}
                    </h3>
                    {trend && (
                        <p style={{
                            fontSize: '0.8rem',
                            marginTop: '0.5rem',
                            color: trend > 0 ? 'var(--success)' : 'var(--danger)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
                        </p>
                    )}
                </div>
                <div style={{
                    backgroundColor: `${color}20`, // 20% opacity hex equivalent approx
                    color: color,
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </div>
            </div>
        </Card>
    );
};

export default StatCard;
