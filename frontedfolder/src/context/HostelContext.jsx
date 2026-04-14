/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { messMenuData } from '../data/mockData';

const HostelContext = createContext();

export const useHostel = () => useContext(HostelContext);

export const HostelProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [hostels, setHostels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [notices, setNotices] = useState([]);
    const [messMenu, setMessMenu] = useState(messMenuData);
    const [feeConfig, setFeeConfig] = useState({
        singleRoomHostel: 13000,
        standardRoomHostel: 12000,
        girlsMess: 18500,
        boysMess: 17500
    });

    const fetchHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    };

    const fetchData = async () => {
        try {
            const authOk = localStorage.getItem('token');
            if(!authOk) return;

            // Fetch concurrently
            const [usersRes, roomsRes, messRes, compRes, notRes] = await Promise.all([
                fetch('http://localhost:5000/api/users/students', { headers: fetchHeaders() }),
                fetch('http://localhost:5000/api/rooms', { headers: fetchHeaders() }),
                fetch('http://localhost:5000/api/mess', { headers: fetchHeaders() }),
                fetch('http://localhost:5000/api/complaints', { headers: fetchHeaders() }),
                fetch('http://localhost:5000/api/notices', { headers: fetchHeaders() })
            ]);

            if (usersRes.ok) setStudents(await usersRes.json());
            if (roomsRes.ok) setRooms(await roomsRes.json());
            if (messRes.ok) setMessMenu(await messRes.json());
            if (compRes.ok) setComplaints(await compRes.json());
            if (notRes.ok) setNotices(await notRes.json());
            
        } catch (error) {
            console.error('Error fetching hostel data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // Set up an interval or depend on something to refetch if needed.
        // Doing it once per load is fine for now on refresh.
    }, []);

    const updateFeeConfig = (newConfig) => {
        setFeeConfig(prev => ({ ...prev, ...newConfig }));
    };

    const updateMessMenu = async (gender, year, updatedMenu) => {
        // Needs to map over the 7 days or just send multiple posts if the backend takes single day. 
        // Based on backend setMessMenu: expects {gender, year, day, breakfast, lunch, dinner}
        // Since frontend updatedMenu sends the whole week object for that year, we'll iterate
        for (const [day, meals] of Object.entries(updatedMenu)) {
             await fetch('http://localhost:5000/api/mess', {
                method: 'POST',
                headers: fetchHeaders(),
                body: JSON.stringify({ gender, year, day, ...meals })
            });
        }
        fetchData(); // Refresh all
    };

    const updateHostelConfig = (updatedHostels) => {
        setHostels(updatedHostels);
        // Usually you'd post this to backend too, omitted for brevity / not in DB spec
    };

    const addComplaint = async (newComplaint) => {
        const res = await fetch('http://localhost:5000/api/complaints', {
            method: 'POST',
            headers: fetchHeaders(),
            body: JSON.stringify(newComplaint)
        });
        if(res.ok) fetchData();
    };

    const resolveComplaint = async (id, reply) => {
        const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
            method: 'PUT',
            headers: fetchHeaders(),
            body: JSON.stringify({ status: 'Resolved' })
        });
        if(res.ok) fetchData();
    };

    const allocateRoom = async (studentId, roomId) => {
        // Would be an API call to update student's room field and room's occupant field
        // Just mock updating local state for now if API isn't exactly built
        setStudents(students.map(s => s._id === studentId ? { ...s, room: roomId } : s));
    };

    const updateStudentFeeStatus = async (studentId, type, status) => {
        // If type === hostel, update fees.hostel, etc
        const payload = type === 'hostel' ? { hostel: status ? 15000 : 0 } : { mess: status ? 12000 : 0 };
        const res = await fetch(`http://localhost:5000/api/users/${studentId}/fees`, {
            method: 'PUT',
            headers: fetchHeaders(),
            body: JSON.stringify(payload)
        });
        if (res.ok) fetchData();
    };

    const addNotice = async (notice) => {
        const res = await fetch('http://localhost:5000/api/notices', {
            method: 'POST',
            headers: fetchHeaders(),
            body: JSON.stringify(notice)
        });
        if(res.ok) fetchData();
    };

    // Public API to trigger a refetch manually after login
    const reloadHostelData = () => {
        fetchData();
    };

    return (
        <HostelContext.Provider value={{
            students, rooms, hostels, complaints, notices, messMenu, feeConfig,
            addComplaint, resolveComplaint, allocateRoom, addNotice, setStudents, updateHostelConfig, updateMessMenu,
            updateStudentFeeStatus, updateFeeConfig, reloadHostelData
        }}>
            {children}
        </HostelContext.Provider>
    );
};
