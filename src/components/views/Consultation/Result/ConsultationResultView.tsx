"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import {
  RiRefreshLine,
  RiCheckDoubleLine,
  RiLightbulbLine,
  RiFileListLine,
} from "react-icons/ri";
import { ConsultationService } from "@/service/consultationService";

type Fact = {
  code: string;
  question: string;
};

type Recommendation = {
  id: number;
  title: string;
  content: string;
  sourceId: number;
  createdAt: string;
  isActive: boolean;
  conclusionId: number;
};

type Conclusion = {
  id: number;
  code: string;
  description: string;
  category: string;
  createdAt: string;
  isActive: boolean;
  recommendations: Recommendation[];
};

type ConsultationResult = {
  consultationId: number;
  facts: Fact[];
  conclusions: Conclusion[];
};

function RecommendationCard({
  rec,
  index,
}: {
  rec: Recommendation;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 160;
  const isLong = rec.content.length > MAX_LENGTH;

  return (
    <Paper
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
              {rec.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {isLong && !expanded
                ? `${rec.content.slice(0, MAX_LENGTH)}...`
                : rec.content}
            </Typography>
            {isLong && (
              <Button
                size="small"
                variant="text"
                onClick={() => setExpanded(!expanded)}
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
}

export default function ConsultationResultView() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchConsultationResult();
  }, []);

  const fetchConsultationResult = async () => {
    try {
      setLoading(true);
      const consultationId = localStorage.getItem("consultationId") ?? "2";
      const response = await ConsultationService.getConsultationResult(
        consultationId,
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConsultation = () => {
    localStorage.removeItem("consultationId");
    router.push(ROUTE_PATHS.USER.CONSULTATION.BASE);
  };

  const handleFinish = () => {
    router.push(ROUTE_PATHS.USER.DASHBOARD);
  };

  if (loading) {
    return (
      <Stack direction="column" gap={4}>
        <Skeleton variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
      </Stack>
    );
  }

  const consultationDate = result?.conclusions?.[0]?.createdAt
    ? new Date(result.conclusions[0].createdAt).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Stack direction="column" gap={4}>
      {/* Header */}
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap="wrap"
          gap={1}
          mb={1}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Hasil Analisis Keuangan
          </Typography>
          {consultationDate && (
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.secondary"
            >
              {consultationDate}
            </Typography>
          )}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Berikut adalah rekomendasi pengelolaan keuangan berdasarkan hasil
          analisis Anda.
        </Typography>
      </Box>

      {/* Facts Summary */}
      {result?.facts && result.facts.length > 0 && (
        <Box>
          <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
            <RiFileListLine size={20} />
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Kondisi Keuangan Anda
            </Typography>
          </Stack>
          <Paper elevation={1} sx={{ borderRadius: 2, p: 2, bgcolor: "grey.50" }}>
            <Stack direction="column" gap={1.5}>
              {result.facts.map((fact) => (
                <Stack
                  key={fact.code}
                  direction="row"
                  alignItems="flex-start"
                  gap={1.5}
                >
                  <Chip
                    label={fact.code}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ minWidth: 48, mt: 0.25, flexShrink: 0 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {fact.question}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}

      {/* Conclusions & Recommendations */}
      {result?.conclusions?.map((conclusion) => (
        <Box key={conclusion.id}>
          {/* Summary Card */}
          <Card
            elevation={4}
            sx={{
              background: "linear-gradient(135deg, #003366 0%, #004d99 100%)",
              color: "white",
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
                      color: "white",
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
                      color: "rgba(255,255,255,0.8)",
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

          {/* Recommendations */}
          {conclusion.recommendations && conclusion.recommendations.length > 0 && (
            <Box>
              <Stack direction="row" alignItems="center" gap={1.5} mb={2}>
                <RiLightbulbLine size={20} />
                <Typography variant="h6" fontWeight="bold" color="text.primary">
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
                {conclusion.recommendations.map((rec, idx) => (
                  <RecommendationCard key={rec.id} rec={rec} index={idx + 1} />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      ))}

      <Divider />

      {/* Action Buttons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        gap={2}
        pt={2}
      >
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<RiRefreshLine />}
          onClick={handleNewConsultation}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Buat Konsultasi Baru
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<RiCheckDoubleLine />}
          onClick={handleFinish}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
          }}
        >
          Selesai & Ke Dashboard
        </Button>
      </Stack>
    </Stack>
  );
}
