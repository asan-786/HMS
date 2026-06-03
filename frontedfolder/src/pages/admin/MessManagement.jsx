
import React, { useState, useEffect } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Utensils, Save, CheckCircle } from 'lucide-react';
// import API from '../../utils/api';   // ✅ IMPORTANT
import API from '../../api';

const MessManagement = () => {

    const { messMenu } = useHostel();

    const [selectedGender, setSelectedGender] = useState('Boys');
    const [selectedYear, setSelectedYear] = useState('1st Year'); // ✅ FIXED

    // ✅ DEFAULT MENU (VERY IMPORTANT)
    const defaultMenu = {
        Monday: { breakfast: '', lunch: '', dinner: '' },
        Tuesday: { breakfast: '', lunch: '', dinner: '' },
        Wednesday: { breakfast: '', lunch: '', dinner: '' },
        Thursday: { breakfast: '', lunch: '', dinner: '' },
        Friday: { breakfast: '', lunch: '', dinner: '' },
        Saturday: { breakfast: '', lunch: '', dinner: '' },
        Sunday: { breakfast: '', lunch: '', dinner: '' }
    };

    







    // ✅ ALWAYS START WITH DEFAULT MENU
    const [localMenu, setLocalMenu] = useState(defaultMenu);

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const days = Object.keys(defaultMenu);
    const meals = ['breakfast', 'lunch', 'dinner'];

    // ✅ LOAD DATA IF EXISTS
    useEffect(() => {
        if (messMenu && Object.keys(messMenu).length > 0) {
            setLocalMenu({ ...defaultMenu, ...messMenu });
        }
    }, [messMenu]);

    const handleTabChange = (gender, year) => {
        setSelectedGender(gender);
        setSelectedYear(
            year === 1 ? "1st Year" :
            year === 2 ? "2nd Year" :
            year === 3 ? "3rd Year" :
            "4th Year"
        );
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
    };

    // ✅ FINAL SAVE FUNCTION (FIXED)
    const handleSave = async () => {
        try {
            setIsSaving(true);

            console.log("🚀 SENDING MENU:", localMenu);

            for (const day of days) {
                console.log("➡️ Sending:", day, localMenu[day]);

                await API.put(`/mess/menu/${day}`, {
                    gender: selectedGender,
                    year: selectedYear,
                    breakfast: localMenu[day]?.breakfast || "",
                    lunch: localMenu[day]?.lunch || "",
                    dinner: localMenu[day]?.dinner || ""
                });
            }

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            
        } catch (error) {
            console.error("❌ Error saving menu:", error.response?.data || error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <header className="flex-between" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Mess Management</h1>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    {showSuccess && (
                        <div style={{ color: 'green' }}>
                            <CheckCircle size={18} /> Saved
                        </div>
                    )}
                    <Button onClick={handleSave} disabled={isSaving}>
                        <Save size={18} />
                        {isSaving ? 'Saving...' : 'Save Menu'}
                    </Button>
                </div>
            </header>

            {/* FILTERS */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                {['Boys', 'Girls'].map(g => (
                    <button key={g} onClick={() => setSelectedGender(g)}>
                        {g}
                    </button>
                ))}

                {[1, 2, 3, 4].map(y => (
                    <button key={y} onClick={() => handleTabChange(selectedGender, y)}>
                        {y} Year
                    </button>
                ))}
            </div>

            {/* TABLE */}
            <Card>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>

                    <tbody>
                        {days.map(day => (
                            <tr key={day}>
                                <td>{day}</td>

                                {meals.map(meal => (
                                    <td key={meal}>
                                        <textarea
                                            value={localMenu?.[day]?.[meal] || ""}
                                            onChange={(e) =>
                                                handleInputChange(day, meal, e.target.value)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default MessManagement;