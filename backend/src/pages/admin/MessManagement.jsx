import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Utensils, Save, CheckCircle } from 'lucide-react';

const MessManagement = () => {
    const { messMenu, updateMessMenu } = useHostel();
    const [selectedGender, setSelectedGender] = useState('Boys');
    const [selectedYear, setSelectedYear] = useState(1);
    const [localMenu, setLocalMenu] = useState(messMenu[selectedGender][selectedYear]);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['breakfast', 'lunch', 'dinner'];

    // Sync local state with context when filters or context state changes
    React.useEffect(() => {
        setLocalMenu(messMenu[selectedGender][selectedYear]);
    }, [selectedGender, selectedYear, messMenu]);

    const handleTabChange = (gender, year) => {
        setSelectedGender(gender);
        setSelectedYear(year);
        setShowSuccess(false);
    };

    const handleInputChange = (day, meal, value) => {
        setLocalMenu(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [meal]: value
            }
        }));
        if (showSuccess) setShowSuccess(false);
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            updateMessMenu(selectedGender, selectedYear, localMenu);
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header className="flex-between" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Mess Management</h1>
                    <p className="subtitle">Configure weekly menus for different years and genders.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {showSuccess && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', animation: 'fade-in 0.3s' }}>
                            <CheckCircle size={18} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Menu updated successfully</span>
                        </div>
                    )}
                    <Button
                        disabled={isSaving}
                        onClick={handleSave}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Save size={18} />
                        {isSaving ? 'Saving...' : 'Save Menu'}
                    </Button>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Filters */}
                <div style={{ display: 'flex', gap: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                    <div>
                        <p className="subtitle" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Hostel Type</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['Boys', 'Girls'].map(g => (
                                <button
                                    key={g}
                                    onClick={() => handleTabChange(g, selectedYear)}
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: 'var(--radius-full)',
                                        border: '1px solid var(--border-light)',
                                        background: selectedGender === g ? (g === 'Boys' ? 'var(--primary)' : '#ec4899') : 'rgba(255,255,255,0.05)',
                                        color: selectedGender === g ? '#fff' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontWeight: 500,
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: '1px', background: 'var(--border-light)' }} />

                    <div>
                        <p className="subtitle" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Academic Year</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[1, 2, 3, 4].map(y => (
                                <button
                                    key={y}
                                    onClick={() => handleTabChange(selectedGender, y)}
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: 'var(--radius-full)',
                                        border: '1px solid var(--border-light)',
                                        background: selectedYear === y ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: selectedYear === y ? '#fff' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontWeight: 500,
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {y === 4 ? 'Final Year' : `${y}${y === 1 ? 'st' : y === 2 ? 'nd' : 'rd'} Year`}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Edit Grid */}
                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500, width: '150px' }}>Day</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Utensils size={16} /> Breakfast
                                    </div>
                                </th>
                                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Utensils size={16} /> Lunch
                                    </div>
                                </th>
                                <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Utensils size={16} /> Dinner
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map(day => (
                                <tr key={day} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#fff' }}>{day}</td>
                                    {meals.map(meal => (
                                        <td key={meal} style={{ padding: '0.75rem 1rem' }}>
                                            <textarea
                                                value={localMenu[day][meal]}
                                                onChange={(e) => handleInputChange(day, meal, e.target.value)}
                                                rows={2}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    borderRadius: 'var(--radius-sm)',
                                                    background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid var(--border-light)',
                                                    color: 'var(--text-muted)',
                                                    fontSize: '0.85rem',
                                                    resize: 'none',
                                                    outline: 'none',
                                                    transition: 'all 0.2s',
                                                    lineHeight: '1.4'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                                                    e.target.style.borderColor = 'var(--primary)';
                                                    e.target.style.color = '#fff';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.background = 'rgba(255,255,255,0.02)';
                                                    e.target.style.borderColor = 'var(--border-light)';
                                                    e.target.style.color = 'var(--text-muted)';
                                                }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default MessManagement;
