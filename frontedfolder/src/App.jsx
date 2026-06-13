import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HostelProvider } from './context/HostelContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import MeritList from "./pages/admin/MeritList";
import './App.css';
import RollVerification
from "./pages/admin/RollVerification";
import AboutUs from "./pages/AboutUs";

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
      <Route path="/admin/roll-verification"

    element={<RollVerification />}
  /> 

    {/* <Route
    path="/admin/roll-verification"
    element={
        <PrivateRoute role="admin">
            <RollVerification />
        </PrivateRoute>
    }
/> */}



   <Route
path="/admin/*"
element={<AdminDashboard />}
/>

   
   <Route
path="/about"
element={<AboutUs />}
/>



      {/* Student Routes
      <Route path="/student/*" element={
        <PrivateRoute role="student">
          <StudentDashboard />
        </PrivateRoute>
      } /> */}


   <Route
path="/student/*"
element={<StudentDashboard />}
/>


    <Route
  path="/admin/merit-list"
  element={
    <PrivateRoute role="admin">
      <MeritList />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/*"
  element={
    <PrivateRoute role="admin">
      <AdminDashboard />
    </PrivateRoute>
  }
/>



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
