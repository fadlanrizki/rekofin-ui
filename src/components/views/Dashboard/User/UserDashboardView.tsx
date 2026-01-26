"use client";
import {
  Box,
  Button,
  // Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

const UserDashboardView = () => {
  const username = localStorage.getItem("username");

  const StyledSummaryCard = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }));

  return (
    <Box className="flex flex-col gap-4">
      {/* Greetings */}
      <Box className="flex flex-col gap-1">
        <Typography variant="h5" fontWeight="bold" color="primary">
          Selamat Datang, {username}!
        </Typography>
        <Typography variant="body1" fontWeight="regular">
          Rekofin adalah sistem rekomendasi strategi pengelolaan keuangan
          berbasis sistem pakar. konsultasikan keuangan anda untuk mendapatkan
          rekomendasi strategi pengelolaan keuangan yang tepat.
        </Typography>
      </Box>

      {/* Status Konsultasi Terakhir */}
      <Paper className="p-4">
        <Box className="flex flex-col gap-2">
          <Typography variant="h6" fontWeight="bold">
            Status Konsultasi Terakhir
          </Typography>

          <Box className="flex flex-col gap-2">
            <Typography variant="body1" fontWeight="regular">
              Belum ada konsultasi
            </Typography>

            <Box className="flex gap-2">
              <Button variant="contained" size="small">
                Lihat Hasil Konsultasi
              </Button>
              <Button variant="outlined" size="small">
                Mulai Konsultasi Baru
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Card Summary */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 4 }}>
          <StyledSummaryCard className="p-4 text-center">
            <Typography variant="body1" fontWeight="bold">
              Total Konsultasi
            </Typography>
            <Typography variant="h5" fontWeight="regular">
              0
            </Typography>
          </StyledSummaryCard>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <StyledSummaryCard className="p-4 text-center">
            <Typography variant="body1" fontWeight="bold">
              Total Rekomendasi
            </Typography>
            <Typography variant="h5" fontWeight="regular">
              0
            </Typography>
          </StyledSummaryCard>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <StyledSummaryCard className="p-4 text-center">
            <Typography variant="body1" fontWeight="bold">
              Konsultasi Terakhir
            </Typography>
            <Typography variant="h5" fontWeight="regular">
              -
            </Typography>
          </StyledSummaryCard>
        </Grid>
      </Grid>

      {/* latest consultation conclusion */}
      <Paper className="p-4">
        <Box className="flex flex-col gap-2">
          <Typography variant="h6" fontWeight="bold">
            Kesimpulan Konsultasi Terakhir
          </Typography>

          <Box className="flex flex-col gap-2">
            <Typography variant="body1" fontWeight="regular">
              Belum ada konsultasi
            </Typography>

            {/* <Box className="flex gap-2">
              <Button
                variant="contained"
                size="small"
              >
                Lihat Detail Rekomendasi
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Paper>

      {/* Riwayat konsultasi terakhir */}
      <Paper className="p-4">
        <Box className="flex flex-col gap-2">
          <Typography variant="h6" fontWeight="bold">
            Riwayat Konsultasi Terakhir
          </Typography>

          <Box className="flex flex-col gap-2">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2022-01-01</TableCell>
                  <TableCell>
                    <Chip label="Selesai" color="success" />
                  </TableCell>
                  <TableCell>
                    <Button variant="text" size="small">
                      Lihat Detail
                    </Button>
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell
                    width={100}
                    colSpan={4}
                    sx={{ textAlign: "center" }}
                  >
                    Belum ada riwayat konsultasi
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserDashboardView;
