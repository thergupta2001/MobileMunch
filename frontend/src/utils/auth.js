import axios from "axios";

export const setAuthToken = (token) => {
     localStorage.setItem('authToken', token);
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const getAuthToken = () => {
     return localStorage.getItem('authToken')
}

export const clearAuthToken = () => {
     localStorage.removeItem('authToken')
     delete axios.defaults.headers.common['Authorization']
}

export const isAuthenticated = () => {
     const authToken = localStorage.getItem('authToken');
     return authToken !== null;
}

export const handleLogout = () => {
     clearAuthToken();
     window.location.href = '/'
}