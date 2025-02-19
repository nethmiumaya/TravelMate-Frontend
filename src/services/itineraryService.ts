import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Existing create methods
export const createItinerary = async (data: any) => {
    const response = await axios.post(`${API_URL}/itineraries`, data, getAuthHeaders());
    return response.data;
};

export const createDestination = async (data: any) => {
    const response = await axios.post(`${API_URL}/destinations`, data, getAuthHeaders());
    return response.data;
};

export const createActivity = async (data: any) => {
    const response = await axios.post(`${API_URL}/activities`, data, getAuthHeaders());
    return response.data;
};

// Example update methods (if your backend supports them)
export const updateItinerary = async (id: number, data: any) => {
    const response = await axios.put(`${API_URL}/itineraries/${id}`, data, getAuthHeaders());
    return response.data;
};

export const updateDestination = async (id: number, data: any) => {
    const response = await axios.put(`${API_URL}/destinations/${id}`, data, getAuthHeaders());
    return response.data;
};

export const updateActivity = async (id: number, data: any) => {
    const response = await axios.put(`${API_URL}/activities/${id}`, data, getAuthHeaders());
    return response.data;
};
