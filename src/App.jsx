import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HostelProvider } from './context/HostelContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (role && user.role !== role) {
    if (user.role === 'admin') return <Navigate to="/admin" />;
    return <Navigate to="/student" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Student Routes */}
      <Route path="/student/*" element={
        <PrivateRoute role="student">
          <StudentDashboard />
        </PrivateRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <PrivateRoute role="admin">
          <AdminDashboard />
        </PrivateRoute>
      } />

      {/* Fallback routing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HostelProvider>
          <AppRoutes />
        </HostelProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
