"use client";

import Loading from "@/components/shared/Loading";
import { ConsultationService } from "@/service/consultationService";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { formatDateView } from "@/utils/date";
import { getErrorMessage } from "@/utils/message";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiArrowLeftLine,
  RiCheckboxCircleLine,
  RiFileListLine,
  RiLightbulbLine,
} from "react-icons/ri";

type TFact = {
  code: string;
  question: string;
};

type TRecommendation = {
  id: number;
  title: string;
  content: string;
};

type TConclusion = {
  id: number;
  code: string;
  description: string;
  category: string;
  createdAt?: string;
  recommendations: TRecommendation[];
};

type TConsultationResult = {
  consultationId: number;
  startedAt?: string;
  endedAt?: string;
  facts: TFact[];
  conclusions: TConclusion[];
};

const RecommendationCard = ({
  recommendation,
  index,
}: {
  recommendation: TRecommendation;
  index: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 180;
  const hasLongContent = recommendation.content.length > maxLength;

  return (
    <Paper
      key={recommendation.id}
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold" color="primary">
        {index + 1}. {recommendation.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={0.75}>
        {hasLongContent && !expanded
          ? `${recommendation.content.slice(0, maxLength)}...`
          : recommendation.content}
      </Typography>
      {hasLongContent && (
        <Button
          size="small"
          variant="text"
          onClick={() => setExpanded((prev) => !prev)}
          sx={{ mt: 0.5, px: 0, minWidth: 0, textTransform: "none" }}
        >
          {expanded ? "Lebih sedikit" : "Baca selengkapnya"}
        </Button>
      )}
    </Paper>
  );
};

const HistoryDetailView = () => {
  const router = useRouter();
  const params = useParams<{ id?: string | string[] }>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<TConsultationResult | null>(null);

  const paramsId = params?.id;
  const consultationId = Array.isArray(paramsId) ? paramsId[0] : paramsId;

  useEffect(() => {
    if (!consultationId) {
      setErrorMessage("ID history tidak ditemukan.");
      return;
    }

    const fetchConsultationResult = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response =
          await ConsultationService.getConsultationResult(consultationId);
        setResult(response.data as TConsultationResult);
      } catch (error) {
        setErrorMessage(
          getErrorMessage(error) || "Gagal memuat detail history.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConsultationResult();
  }, [consultationId]);

  const handleBack = () => {
    router.push(ROUTE_PATHS.USER.HISTORY);
  };

  const consultationDateRaw =
    result?.startedAt ?? result?.endedAt ?? result?.conclusions?.[0]?.createdAt;

  if (loading) {
    return (
      <Stack className="p-6" alignItems="center" spacing={1}>
        <Loading size="md" />
        <Typography variant="body2" color="text.secondary">
          Memuat detail history...
        </Typography>
      </Stack>
    );
  }

  if (errorMessage) {
    return (
      <Stack spacing={2} className="p-6">
        <Typography color="error">{errorMessage}</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<RiArrowLeftLine />}
          >
            Kembali ke History
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack direction="column" gap={4} className="p-6">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Detail Riwayat Konsultasi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID Konsultasi: {result?.consultationId ?? "-"}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<RiArrowLeftLine />}
        >
          Kembali
        </Button>
      </Stack>

      <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Tanggal Konsultasi
        </Typography>
        <Typography variant="body1" fontWeight="medium">
          {consultationDateRaw ? formatDateView(consultationDateRaw) : "-"}
        </Typography>
      </Paper>

      {result?.facts && result.facts.length > 0 && (
        <Box>
          <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
            <RiFileListLine size={20} />
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Fakta Konsultasi
            </Typography>
          </Stack>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={1.5}>
              {result.facts.map((fact, index) => (
                <Stack
                  key={`${fact.code}-${fact.question}`}
                  direction="row"
                  gap={1.5}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {fact.question}
                  </Typography>
                  <RiCheckboxCircleLine size={18} color="#2e7d32" />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}

      {result?.conclusions?.map((conclusion) => (
        <Box key={conclusion.id}>
          <Paper
            elevation={3}
            sx={{
              p: 2.5,
              borderRadius: 2,
              mb: 2,
              borderLeft: "6px solid",
              borderLeftColor: "primary.main",
              bgcolor: "primary.50",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1.5}
              flexWrap="wrap"
              mb={1.5}
            >
              <Chip label={conclusion.category} color="primary" />
            </Stack>
            <Typography variant="body1" color="text.secondary">
              {conclusion.description}
            </Typography>
          </Paper>

          {conclusion.recommendations &&
            conclusion.recommendations.length > 0 && (
              <Box>
                <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
                  <RiLightbulbLine size={18} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Rekomendasi
                  </Typography>
                </Stack>
                <Stack
                  spacing={1.5}
                  sx={
                    conclusion.recommendations.length > 3
                      ? {
                          maxHeight: 420,
                          overflowY: "auto",
                          pr: 0.5,
                        }
                      : undefined
                  }
                >
                  {conclusion.recommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                      index={index}
                    />
                  ))}
                </Stack>
              </Box>
            )}
        </Box>
      ))}

      <Divider />
    </Stack>
  );
};

export default HistoryDetailView;
