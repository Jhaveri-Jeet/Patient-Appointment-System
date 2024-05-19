import axios from "axios";

const prefixUrl = "http://127.0.0.1:8000";

// Patients APIs
export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/patient`);
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

// Services APIs
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/service`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
