"use client";
import { DashboardService } from "@/service/dashboardService";
import type { TUserDashboardData } from "@/types/common";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { formatDateView } from "@/utils/date";
import { getErrorMessage } from "@/utils/message";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StyledSummaryCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const defaultDashboardData: TUserDashboardData = {
  totalConsultation: 0,
  lastConsultationDate: null,
  lastConsultation: null,
  recentHistories: [],
};

const UserDashboardView = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [data, setData] = useState<TUserDashboardData>(defaultDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await DashboardService.getUserDashboardData();
      setData(response.data);
    } catch (err) {
      // Fallback: use consultation service endpoints
      const message = getErrorMessage(err);
      setError(message || "Gagal memuat data dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleNavigateConsultation = () => {
    router.push(ROUTE_PATHS.USER.CONSULTATION.BASE);
  };

  const handleNavigateResult = (consultationId?: number) => {
    if (consultationId) {
      localStorage.setItem("consultationId", String(consultationId));
    }
    router.push(ROUTE_PATHS.USER.CONSULTATION.RESULT);
  };

  const handleNavigateQuestion = () => {
    router.push(ROUTE_PATHS.USER.CONSULTATION.QUESTION);
  };

  const handleNavigateHistory = () => {
    router.push(ROUTE_PATHS.USER.HISTORY);
  };

  const lastConsultation = data.lastConsultation;
  const isInProgress = lastConsultation?.status.toLowerCase() === "in_progress";
  const isCompleted = lastConsultation?.status.toLowerCase() === "completed";

  if (error) {
    return (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 300 }}
      >
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <Button variant="contained" onClick={fetchDashboardData}>
          Coba Lagi
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction={"column"} spacing={4}>
      {/* Greetings */}
      <Box className="flex flex-col gap-1">
        <Typography variant="h5" fontWeight="bold" color="primary">
          Selamat Datang, {username || "..."}!
        </Typography>
        <Typography variant="body1" fontWeight="regular">
          Rekofin adalah sistem rekomendasi strategi pengelolaan keuangan
          berbasis sistem pakar. Konsultasikan keuangan anda untuk mendapatkan
          rekomendasi strategi pengelolaan keuangan yang tepat.
        </Typography>
      </Box>

      {/* Status Konsultasi Terakhir */}
      <Paper className="p-4" elevation={3}>
        <Box className="flex flex-col gap-2">
          <Typography variant="h6" fontWeight="bold" color="primary">
            Status Konsultasi Terakhir
          </Typography>

          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" width={200} />
              <Skeleton variant="rectangular" width={300} height={36} />
            </Stack>
          ) : (
            <Box className="flex flex-col gap-2">
              {isInProgress ? (
                <>
                  <Typography
                    variant="body1"
                    fontWeight="regular"
                    color="warning.main"
                  >
                    Anda memiliki konsultasi yang sedang berlangsung
                  </Typography>
                  <Box className="flex gap-2">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleNavigateQuestion}
                    >
                      Lanjutkan Konsultasi
                    </Button>
                  </Box>
                </>
              ) : isCompleted ? (
                <>
                  <Typography
                    variant="body1"
                    fontWeight="regular"
                    color="success.main"
                  >
                    Konsultasi terakhir telah selesai pada{" "}
                    {formatDateView(lastConsultation?.endedAt || "")}
                  </Typography>
                  <Box className="flex gap-2">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleNavigateResult(lastConsultation?.id)}
                    >
                      Lihat Hasil Konsultasi
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleNavigateConsultation}
                    >
                      Mulai Konsultasi Baru
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    fontWeight="regular"
                    color="text.secondary"
                  >
                    Belum ada konsultasi
                  </Typography>
                  <Box className="flex gap-2">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleNavigateConsultation}
                    >
                      Mulai Konsultasi Baru
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Card Summary */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledSummaryCard className="p-4 text-center" elevation={3}>
            <Typography variant="body1" fontWeight="bold">
              Total Konsultasi
            </Typography>
            <Typography variant="h5" fontWeight="regular">
              {loading ? (
                <Skeleton variant="text" width={40} sx={{ mx: "auto" }} />
              ) : (
                data.totalConsultation
              )}
            </Typography>
          </StyledSummaryCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StyledSummaryCard className="p-4 text-center" elevation={3}>
            <Typography variant="body1" fontWeight="bold">
              Konsultasi Terakhir
            </Typography>
            <Typography variant="h5" fontWeight="regular">
              {loading ? (
                <Skeleton variant="text" width={100} sx={{ mx: "auto" }} />
              ) : data.lastConsultationDate ? (
                formatDateView(data.lastConsultationDate)
              ) : (
                "-"
              )}
            </Typography>
          </StyledSummaryCard>
        </Grid>
      </Grid>

      {/* Kesimpulan Konsultasi Terakhir */}
      <Paper className="p-4" elevation={3}>
        <Box className="flex flex-col gap-2">
          <Typography variant="h6" fontWeight="bold" color="primary">
            Kesimpulan Konsultasi Terakhir
          </Typography>

          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Stack>
          ) : lastConsultation &&
            lastConsultation.conclusions &&
            lastConsultation.conclusions.length > 0 ? (
            <Stack spacing={2}>
              {lastConsultation.conclusions.map((item, index) => (
                <Paper
                  key={item.conclusion?.id || index}
                  variant="outlined"
                  sx={{ p: 2 }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.conclusion?.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.conclusion?.description}
                  </Typography>
                  {item.conclusion?.recommendations &&
                    item.conclusion.recommendations.length > 0 && (
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        {item.conclusion.recommendations.length} rekomendasi
                        tersedia
                      </Typography>
                    )}
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Belum ada konsultasi
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Riwayat Konsultasi Terakhir */}
      <Paper className="p-4" elevation={3}>
        <Box className="flex flex-col gap-2">
          <Box className="flex justify-between items-center">
            <Typography variant="h6" fontWeight="bold" color="primary">
              Riwayat Konsultasi Terakhir
            </Typography>
            {!loading && data.recentHistories.length > 0 && (
              <Button
                variant="text"
                size="small"
                onClick={handleNavigateHistory}
              >
                Lihat Semua Riwayat
              </Button>
            )}
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>No</StyledTableCell>
                  <StyledTableCell>Tanggal</StyledTableCell>
                  <StyledTableCell>Kesimpulan</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Aksi</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell>
                        <Skeleton variant="text" />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton variant="text" />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton variant="text" />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton variant="text" width={80} />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton variant="text" width={80} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : data.recentHistories.length > 0 ? (
                  data.recentHistories.map((history, index) => (
                    <StyledTableRow key={history.id}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>
                        {formatDateView(history.startedAt)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {history.conclusions
                          .map((c) => c.conclusion?.category)
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Chip
                          label={
                            history.status.toLowerCase() === "completed"
                              ? "Selesai"
                              : "Dalam Proses"
                          }
                          color={
                            history.status.toLowerCase() === "completed"
                              ? "success"
                              : "warning"
                          }
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {history.status.toLowerCase() === "completed" && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleNavigateResult(history.id)}
                          >
                            Lihat Detail
                          </Button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} sx={{ textAlign: "center" }}>
                      Belum ada riwayat konsultasi
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Stack>
  );
};

export default UserDashboardView;
