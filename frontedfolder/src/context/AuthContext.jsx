/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Configure axios base URL
const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial load: Check token from localStorage and verify with backend
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Session expired or backend unreachable');
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const data = response.data;
            
            localStorage.setItem('token', data.token);
            setUser(data);
            return { success: true, role: data.role };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Invalid credentials or server error' 
            };
        }
    };

    const register = async (name, email, password, role = 'student', studentID = '', phoneNumber = '') => {
        try {
            const response = await axios.post(`${API_URL}/register`, { 
                name, email, password, role, studentID, phoneNumber 
            });
            const data = response.data;
            
            localStorage.setItem('token', data.token);
            setUser(data);
            return { success: true, role: data.role };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
