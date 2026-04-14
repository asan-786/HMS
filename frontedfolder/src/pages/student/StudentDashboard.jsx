import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { LayoutDashboard, Utensils, ClipboardEdit, Wallet, MessageSquareWarning, Bell } from 'lucide-react';

// Sub-pages
import Overview from './Overview';
import MessManagement from './MessManagement';
import AdmissionForm from './AdmissionForm';
import FeeDetails from './FeeDetails';
import Complaints from './Complaints';
import Notices from './Notices';

const StudentDashboard = () => {
    const studentLinks = [
        { path: "/student", label: "Overview", icon: <LayoutDashboard size={20} />, end: true },
        { path: "/student/mess", label: "Mess Menu", icon: <Utensils size={20} /> },
        { path: "/student/fees", label: "Fee Details", icon: <Wallet size={20} /> },
        { path: "/student/complaints", label: "Complaints", icon: <MessageSquareWarning size={20} /> },
        { path: "/student/notices", label: "Notice Board", icon: <Bell size={20} /> },
        { path: "/student/admission", label: "Hostel Admission", icon: <ClipboardEdit size={20} /> }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <Sidebar links={studentLinks} />

            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', height: '100vh' }}>
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/mess" element={<MessManagement />} />
                    <Route path="/fees" element={<FeeDetails />} />
                    <Route path="/complaints" element={<Complaints />} />
                    <Route path="/notices" element={<Notices />} />
                    <Route path="/admission" element={<AdmissionForm />} />
                    <Route path="*" element={<Navigate to="/student" />} />
                </Routes>
            </main>
        </div>
    );
};

export default StudentDashboard;
