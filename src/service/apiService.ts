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
          const message = error.response.data.message || error.message;
          throw new Error(message);
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
          const message = error.response.data.message || error.message;
          throw new Error(message);
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
          const message = error.response.data.message || error.message;
          throw new Error(message);
      }
    }
  },

  patch: async <T>(url: string, data?: object): Promise<T> => {
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
          const message = error.response.data.message || error.message;
          throw new Error(message);
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
          const message = error.response.data.message || error.message;
          throw new Error(message);
      }
    }
  },
};
