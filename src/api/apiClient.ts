import axios from 'axios';

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
