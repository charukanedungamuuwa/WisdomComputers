import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);

// Auth Provider
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
        role: null,
    });

    // Function to log in
    const login = (token, role) => {
        setAuthState({ isAuthenticated: true, token, role });
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
    };

    // Function to log out
    const logout = () => {
        setAuthState({ isAuthenticated: false, token: null, role: null });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};