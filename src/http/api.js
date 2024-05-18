import axios from "axios";
import { prefixUrl } from "./config";

// Patients APIs
export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/patient`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
