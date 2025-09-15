import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

const getHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    "Content-Type": "application/json",
    authorization: "Bearer " + token,
  };
};

export const apiClient = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, {
        params,
        headers: getHeader(),
      });

      return response.data;
    } catch (error: any) {
      const { status } = error.response;

      switch (status) {
        case 403:
          localStorage.removeItem("token");
          window.location.reload();
        default:
          return error;
      }
    }
  },

  post: async <T>(url: string, data?: object): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error: any) {
      const { status } = error.response;

      switch (status) {
        case 403:
          localStorage.removeItem("token");
          window.location.reload();
        default:
          return error;
      }
    }
  },

  put: async <T>(url: string, data?: object): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error: any) {
      const { status } = error.response;

      switch (status) {
        case 403:
          localStorage.removeItem("token");
          window.location.reload();
        default:
          return error;
      }
    }
  },

  delete: async <T>(url: string, params?: object): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url, {
        params,
        headers: getHeader(),
      });
      return response.data;
    } catch (error: any) {
      const { status } = error.response;

      switch (status) {
        case 403:
          localStorage.removeItem("token");
          window.location.reload();
        default:
          return error;
      }
    }
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

    return response.data;
  } catch (error: any) {
    console.log(error);
    const { status } = error.response;

    switch (status) {
      case 403:
        break;
    }
  }
};
