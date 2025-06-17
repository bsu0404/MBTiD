import axios, { AxiosError, AxiosResponse } from "axios";
import { getAccessToken } from "../store/auth";

// application/json용
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers?.set?.("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    // 엑세스 토큰 만료
    if (status === 401) {
      alert("엑세스 토큰 만료");
    }

    return Promise.reject(error);
  }
);
