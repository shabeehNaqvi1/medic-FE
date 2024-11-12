import axios from "axios";

const customFetch = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const imageFetch = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default customFetch;
