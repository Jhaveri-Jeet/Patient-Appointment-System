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
