"use client";

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
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { RiRefreshLine, RiCheckDoubleLine } from "react-icons/ri";

// --- Types ---
interface Recommendation {
  id: number;
  title: string;
  content: string;
  source: string;
}

interface ResultData {
  score: number;
  status: string;
  summary: string;
  recommendations: Recommendation[];
}

// --- Mock Data ---
const MOCK_RESULT: ResultData = {
  score: 85,
  status: "Sehat Finansial",
  summary:
    "Kondisi keuangan Anda saat ini tergolong sehat. Arus kas positif dan rasio utang aman. Anda siap untuk mulai fokus pada diversifikasi investasi dan peningkatan dana darurat.",
  recommendations: [
    {
      id: 1,
      title: "Optimalkan Dana Darurat",
      content:
        "Tingkatkan dana darurat Anda hingga setara dengan 6-12 bulan pengeluaran bulanan. Simpan di instrumen likuid seperti Reksadana Pasar Uang.",
      source: "Perencana Keuangan Bersertifikat",
    },
    {
      id: 2,
      title: "Mulai Diversifikasi Investasi",
      content:
        "Profil risiko Anda memungkinkan untuk masuk ke instrumen moderat seperti Obligasi Negara atau Reksadana Campuran untuk pertumbuhan aset jangka menengah.",
      source: "Otoritas Jasa Keuangan (OJK)",
    },
    {
      id: 3,
      title: "Review Asuransi Kesehatan",
      content:
        "Pastikan limit asuransi kesehatan Anda mencakup inflasi biaya medis terkini. Pertimbangkan asuransi penyakit kritis jika belum memiliki.",
      source: "Asosiasi Asuransi Jiwa Indonesia",
    },
  ],
};

export default function ConsultationResultView() {
  const router = useRouter();

  const handleNewConsultation = () => {
    // Clear previous ID if needed, or just navigate
    localStorage.removeItem("consultationId");
    router.push(ROUTE_PATHS.USER.CONSULTATION.BASE);
  };

  const handleFinish = () => {
    router.push(ROUTE_PATHS.USER.DASHBOARD);
  };

  return (
    <Stack direction="column" gap={4}>
      {/* Header */}
      <Box>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Hasil Analisis Keuangan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Berikut adalah Rekomendasi pengelolaan keuangan untuk Anda.
        </Typography>
      </Box>

      {/* Main Summary Card - Premium Look */}
      <Card
        elevation={4}
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
          borderRadius: 3,
          position: "relative",
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Chip
              label={MOCK_RESULT.status}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                height: "auto",
                py: 1,
                mb: 1,
              }}
            />
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Ringkasan Eksekutif
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, lineHeight: 1.6, fontSize: "1.1rem" }}
              >
                {MOCK_RESULT.summary}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <Box>
        <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
          Rekomendasi Tindakan
        </Typography>
        <Stack direction="column" gap={2}>
          {MOCK_RESULT.recommendations.map((item) => (
            <Paper
              key={item.id}
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
              }}
            >
              <Stack direction="column" gap={1}>
                {/* Title */}
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  {item.title}
                </Typography>

                {/* Content */}
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>

                {/* Source */}
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      bgcolor: "action.hover",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: "medium",
                      color: "text.secondary",
                    }}
                  >
                    Sumber: {item.source}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

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
