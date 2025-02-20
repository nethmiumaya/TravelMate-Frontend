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

export const getItineraries = async () => {
    const response = await axios.get(`${API_URL}/itineraries`, getAuthHeaders());
    return response.data;
};

export const getItineraryById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/itineraries/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error fetching itinerary:", error);
        throw error;
    }
};

export const deleteItineraryById = async (id: number) => {
    const response = await axios.delete(`${API_URL}/itineraries/${id}`, getAuthHeaders());
    return response.data;
};