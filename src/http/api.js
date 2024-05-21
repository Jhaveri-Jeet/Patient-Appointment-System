import axios from "axios";

const prefixUrl = "http://127.0.0.1:8000";

// Authentication APIs

export const autheticationAdmin = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/adminToken`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAdminDetails = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/admin`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAdminDetails = async (data) => {
  try {
    const response = await axios.put(`${prefixUrl}/admin/${1}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Patients APIs
export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/patient`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPatientsById = async (id) => {
  try {
    const response = await axios.get(`${prefixUrl}/patient/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTotalPatients = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/totalPatients`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPatient = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/patient`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Appointments APIs
export const fetchAppointmentAccToPatients = async (id) => {
  try {
    const response = await axios.get(`${prefixUrl}/appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/appointment`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTodaysAppointments = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/todaysAppointments`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTotalPendingAppointmentCount = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/totalPendingAppointment`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/appointment`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPrescription = async (id, data) => {
  try {
    const response = await axios.post(`${prefixUrl}/prescription/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Services APIs
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/service`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createService = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/service`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await axios.put(`${prefixUrl}/service/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Slot APIs
export const fetchSlots = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/slot`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSlot = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/slot`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSlot = async (id, data) => {
  try {
    const response = await axios.put(`${prefixUrl}/slot/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Payment Integration APIs
export const createPaymentLink = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/createPaymentLink`, data);
    return response.data.url;
  } catch (error) {
    console.error(error);
  }
};
