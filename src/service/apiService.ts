import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // ex: 'https://api.example.com'
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: object): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: object): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },
};

export const apiService = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: any,
  headers?: any
) => {
  const url = `${baseURL}/endpoint`;

  try {
    const response = await axios({
      url,
      method,
      headers,
      data,
    });

    return response.data

  } catch (error: any) {
    console.log(error);    
    const { status } = error.response;

    switch (status) {
      case 403:
        
        break
    }

  }
};
