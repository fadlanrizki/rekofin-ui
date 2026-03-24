export type Option = {
  id: number;
  label: string;
};

export type TConclusion = {
  id: number;
  code: string;
  description: string;
  category: string;
  recommendations: TRecommendation[];
};

export type TRecommendation = {
  id: number;
  title: string;
  content: string;
};

export type TConsultationHistory = {
  id: number;
  status: string;
  startedAt: string;
  endedAt: string;
  conclusions: { conclusion: TConclusion }[];
};

export type TUserDashboardData = {
  totalConsultation: number;
  lastConsultationDate: string | null;
  lastConsultation: TConsultationHistory | null;
  recentHistories: TConsultationHistory[];
};
