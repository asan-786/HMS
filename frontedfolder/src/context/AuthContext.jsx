/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const STORAGE_KEY = 'hms_users';

    const getStoredUsers = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    };

    const saveStoredUsers = (users) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    };

    const createMockToken = (user) => {
        return btoa(JSON.stringify({ email: user.email, id: user.studentID || user.email }));
    };

    const getUserFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token));
            if (payload.email === 'admin@hostel.edu') return { name: 'Demo Admin', email: 'admin@hostel.edu', role: 'admin', studentID: 'ADMIN' };
            if (payload.email === 'student@college.edu') return { name: 'Demo Student', email: 'student@college.edu', role: 'student', studentID: 'DEMO123' };
            const stored = getStoredUsers();
            return stored.find((u) => u.email === payload.email);
        } catch (e) {
            return null;
        }
    };

    // Initial load: Check token and load user from localStorage fallback.
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                let loadedUser = null;
                try {
                    const response = await fetch('http://localhost:5000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.ok) {
                        loadedUser = await response.json();
                    }
                } catch (error) {
                    console.warn('Backend not available, using local fallback auth.');
                }

                if (!loadedUser) {
                    loadedUser = getUserFromToken(token);
                }

                if (loadedUser) {
                    setUser(loadedUser);
                } else {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        if (email === 'admin@hostel.edu' && password === 'admin123') {
            const demoAdmin = { name: 'Demo Admin', email, role: 'admin', studentID: 'ADMIN' };
            localStorage.setItem('token', createMockToken(demoAdmin));
            setUser(demoAdmin);
            return { success: true };
        }
        if (email === 'student@college.edu' && password === 'student123') {
            const demoStudent = { name: 'Demo Student', email, role: 'student', studentID: 'DEMO123' };
            localStorage.setItem('token', createMockToken(demoStudent));
            setUser(demoStudent);
            return { success: true };
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setUser(data);
                return { success: true };
            }
            return { success: false, message: data.message || 'Invalid credentials' };
        } catch (error) {
            console.warn('Backend login failed; using local fallback.');
            const users = getStoredUsers();
            const found = users.find((u) => u.email === email && u.password === password);
            if (found) {
                const token = createMockToken(found);
                localStorage.setItem('token', token);
                setUser(found);
                return { success: true };
            }
            return { success: false, message: 'Invalid credentials (offline mode)' };
        }
    };

    const register = async (name, email, password, role = 'student', studentID = '', phoneNumber = '', masterKey = '') => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role, studentID, phoneNumber, masterKey })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setUser(data);
                return { success: true };
            }
            return { success: false, message: data.message || 'Registration failed' };
        } catch (error) {
            console.warn('Backend register failed; using local fallback.');
            const users = getStoredUsers();
            if (users.some((u) => u.email === email)) {
                return { success: false, message: 'Email is already registered (offline mode).' };
            }

            const newUser = { name, email, password, role, studentID, phoneNumber };
            users.push(newUser);
            saveStoredUsers(users);

            const token = createMockToken(newUser);
            localStorage.setItem('token', token);
            setUser(newUser);
            return { success: true };
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
