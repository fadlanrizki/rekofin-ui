import { API_ROUTE } from "@/utils/constants/api-routes";
import { apiClient } from "./apiService";

const startConsultation = async (): Promise<any> => {
  return await apiClient.post(API_ROUTE.CONSULTATION);
};

const getQuestions = async (consultationId: string): Promise<any> => {
  return await apiClient.get(
    `${API_ROUTE.CONSULTATION}/${consultationId}/questions`,
  );
};

const submitConsultationAnswer = async (
  consultationId: string,
  data: any[],
): Promise<any> => {
  return await apiClient.post(
    `${API_ROUTE.CONSULTATION}/${consultationId}/answers`,
    data,
  );
};

const getConsultationStatus = async (): Promise<any> => {
  return await apiClient.get(`${API_ROUTE.CONSULTATION}/status`);
};

// const getConsultationResult = async (consultationId: string): Promise<any> => {
//   return await apiClient.get(
//     `${API_ROUTE.CONSULTATION}/${consultationId}/result`,
//   );
// };

export const ConsultationService = {
  startConsultation,
  getQuestions,
  submitConsultationAnswer,
  getConsultationStatus,
  // getConsultationResult,
};
