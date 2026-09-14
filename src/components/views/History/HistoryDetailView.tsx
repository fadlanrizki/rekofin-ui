"use client";

import Loading from "@/components/shared/Loading";
import { ConsultationService } from "@/service/consultationService";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { formatDateView } from "@/utils/date";
import { getErrorMessage } from "@/utils/message";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiArrowLeftLine,
  RiFileListLine,
  RiLightbulbLine,
} from "react-icons/ri";

type TFact = {
  code: string;
  fact: string;
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
  const maxLength = 160;
  const hasLongContent = recommendation.content.length > maxLength;

  return (
    <Paper
      key={recommendation.id}
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
        borderLeft: "4px solid",
        borderColor: "primary.main",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" gap={2} alignItems="flex-start">
          <Box
            sx={{
              minWidth: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.875rem",
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            {index}
          </Box>
          <Stack direction="column" gap={1} flexGrow={1}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              {recommendation.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {hasLongContent && !expanded
                ? `${recommendation.content.slice(0, maxLength)}...`
                : recommendation.content}
            </Typography>
            {hasLongContent && (
              <Button
                size="small"
                variant="text"
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "none",
                  p: 0,
                  minWidth: 0,
                  fontSize: "0.8rem",
                }}
              >
                {expanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

const HistoryDetailView = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
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
              Kondisi Keuangan Anda
            </Typography>
          </Stack>
          <Paper
            elevation={1}
            sx={{
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="column" gap={1.5}>
              {result.facts.map((factItem) => (
                <Stack
                  key={factItem.code}
                  direction="row"
                  alignItems="center"
                  gap={1.5}
                >
                  <Chip
                    label={factItem.code}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ minWidth: 48, mt: 0.25, flexShrink: 0 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {factItem.fact}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}

      {result?.conclusions?.map((conclusion) => (
        <Box key={conclusion.id}>
          <Card
            elevation={4}
            sx={{
              background: isDark
                ? "linear-gradient(135deg, #0b2340 0%, #163b66 100%)"
                : "linear-gradient(135deg, #003366 0%, #004d99 100%)",
              color: theme.palette.common.white,
              borderRadius: 3,
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="column" spacing={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  gap={1}
                >
                  <Chip
                    label={conclusion.category}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: theme.palette.common.white,
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      height: "auto",
                      py: 0.75,
                    }}
                  />
                  <Chip
                    label={conclusion.code}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  />
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.9, lineHeight: 1.7 }}
                >
                  {conclusion.description}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {conclusion.recommendations &&
            conclusion.recommendations.length > 0 && (
              <Box>
                <Stack direction="row" alignItems="center" gap={1.5} mb={2}>
                  <RiLightbulbLine size={20} />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Rekomendasi Tindakan
                  </Typography>
                  <Chip
                    label={`${conclusion.recommendations.length} rekomendasi`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="column" gap={2}>
                  {conclusion.recommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                      index={index + 1}
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
