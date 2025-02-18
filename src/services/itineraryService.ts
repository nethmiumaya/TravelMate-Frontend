// src/services/itineraryService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/itineraries';

export const createItinerary = async (data: any) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const getAllItineraries = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateItinerary = async (id: number, data: any) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const getItinerary = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const deleteItinerary = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const shareItinerary = async (id: number, email: string) => {
    const response = await axios.post(`${API_URL}/${id}/share`, { sharedWithEmail: email });
    return response.data;
};

export const viewSharedItinerary = async (sharedLink: string) => {
    const response = await axios.get(`${API_URL}/shared/${sharedLink}`);
    return response.data;
};