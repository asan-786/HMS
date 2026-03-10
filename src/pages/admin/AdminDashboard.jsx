import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { LayoutDashboard, Users, Home, Settings, MessageSquareWarning, Bell, Utensils } from 'lucide-react';

// Sub-pages
import Overview from './Overview';
import StudentDirectory from './StudentDirectory';
import RoomManagement from './RoomManagement';
import RoomAllocation from './RoomAllocation';
import ComplaintManager from './ComplaintManager';
import NoticeBoard from './NoticeBoard';
import MessManagement from './MessManagement';

const AdminDashboard = () => {
    const adminLinks = [
        { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
        { path: "/admin/students", label: "Students", icon: <Users size={20} /> },
        { path: "/admin/rooms", label: "Rooms", icon: <Home size={20} /> },
        { path: "/admin/allocation", label: "Allocation Algo", icon: <Settings size={20} /> },
        { path: "/admin/complaints", label: "Complaints", icon: <MessageSquareWarning size={20} /> },
        { path: "/admin/notices", label: "Notice Board", icon: <Bell size={20} /> },
        { path: "/admin/mess", label: "Mess Menu", icon: <Utensils size={20} /> }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <Sidebar links={adminLinks} />

            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', height: '100vh' }}>
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/students" element={<StudentDirectory />} />
                    <Route path="/rooms" element={<RoomManagement />} />
                    <Route path="/allocation" element={<RoomAllocation />} />
                    <Route path="/complaints" element={<ComplaintManager />} />
                    <Route path="/notices" element={<NoticeBoard />} />
                    <Route path="/mess" element={<MessManagement />} />
                    <Route path="*" element={<Navigate to="/admin" />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
