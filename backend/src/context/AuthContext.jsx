/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock login logic
        if (email === 'admin@hostel.edu' && password === 'admin123') {
            setUser({ role: 'admin', name: 'Hostel Admin', email });
            return true;
        } else if (email === 'student@college.edu' && password === 'student123') {
            setUser({ role: 'student', id: 1, name: 'Mahesh', email, room: 'H4-15', cgpa: 8.9, gender: 'Boys', year: 2 });
            return true;
        }
        return false;
    };

    const register = (name, email, password, role = 'student', studentID = '', phoneNumber = '') => {
        // Mock registration logic
        setUser({ 
            role, 
            id: studentID || Date.now(), 
            name, 
            email, 
            phoneNumber,
            room: 'Pending', 
            year: 1, 
            cgpa: 0 
        });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
