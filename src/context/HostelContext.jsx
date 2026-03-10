/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { mockStudents, mockRooms, mockComplaints, mockNotices, messMenuData, initialHostels, generateRooms } from '../data/mockData';

const HostelContext = createContext();

export const useHostel = () => useContext(HostelContext);

export const HostelProvider = ({ children }) => {
    const [students, setStudents] = useState(mockStudents);
    const [hostels, setHostels] = useState(initialHostels);
    const [rooms, setRooms] = useState(mockRooms);
    const [complaints, setComplaints] = useState(mockComplaints);
    const [notices, setNotices] = useState(mockNotices);
    const [messMenu, setMessMenu] = useState(messMenuData);

    const updateMessMenu = (gender, year, updatedMenu) => {
        setMessMenu(prev => ({
            ...prev,
            [gender]: {
                ...prev[gender],
                [year]: updatedMenu
            }
        }));
    };

    const updateHostelConfig = (updatedHostels) => {
        setHostels(updatedHostels);
        const newRooms = generateRooms(updatedHostels);
        setRooms(newRooms);
        // Reset allocations when infrastructure changes to avoid orphaned room IDs
        setStudents(prev => prev.map(s => ({ ...s, room: null })));
    };

    const addComplaint = (newComplaint) => {
        setComplaints([{ id: Date.now(), ...newComplaint, status: 'Pending', date: new Date().toISOString().split('T')[0] }, ...complaints]);
    };

    const resolveComplaint = (id, reply) => {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved', reply } : c));
    };

    const allocateRoom = (studentId, roomId) => {
        setStudents(students.map(s => s.id === studentId ? { ...s, room: roomId } : s));
        setRooms(rooms.map(r => r.id === roomId ? { ...r, occupants: r.occupants + 1 } : r));
    };

    const addNotice = (notice) => {
        setNotices([{ id: Date.now(), ...notice, date: new Date().toISOString().split('T')[0] }, ...notices]);
    };

    return (
        <HostelContext.Provider value={{
            students, rooms, hostels, complaints, notices, messMenu,
            addComplaint, resolveComplaint, allocateRoom, addNotice, setStudents, updateHostelConfig, updateMessMenu
        }}>
            {children}
        </HostelContext.Provider>
    );
};
