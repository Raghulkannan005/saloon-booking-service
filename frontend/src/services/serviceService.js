import axios from 'axios';

const API_URL = '/api/services';

// Get all services
export const getServices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Get a single service
export const getService = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service ${id}:`, error);
    throw error;
  }
};

// Create a new service
export const createService = async (serviceData) => {
  try {
    const response = await axios.post(API_URL, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update a service
export const updateService = async (id, serviceData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service ${id}:`, error);
    throw error;
  }
};

// Delete a service
export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service ${id}:`, error);
    throw error;
  }
};