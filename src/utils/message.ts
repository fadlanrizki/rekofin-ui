import axios from "axios";

export const getResponseMessage = (response: any) => {
  return response.message || "";
};

export const getErrorMessage = (error: any) => {
  let message = ""
  if (axios.isAxiosError(error)) {
    message = error?.response?.data?.message || "";
  } else if (error instanceof Error) {
    message = error?.message || "";
  }
  return message;
};
