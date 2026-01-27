"use client";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { RiQuestionnaireFill } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { FaGears } from "react-icons/fa6";

export default function ConsultationView() {
  return (
    <Paper sx={{ p: 4 }}>
      <Stack direction={"column"} gap={3}>
        <Box>
          <Typography variant="h5" fontWeight={"medium"} color="primary">
            Mulai Konsultasi Keuangan
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Jawab beberapa pertanyaan sederhana menggunakan pilihan{" "}
            <strong>Ya</strong> atau <strong>Tidak</strong> untuk mendapatkan
            rekomendasi strategi pengelolaan keuangan.
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Table className="text-gray-500 font-medium">
              <TableRow>
                <TableCell sx={{ width: "30px" }} className="text-primary">
                  <RiQuestionnaireFill size={20} />
                </TableCell>
                <TableCell sx={{ width: "20%" }}>Jumlah Pertanyaan</TableCell>
                <TableCell>: 10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30px" }} className="text-primary">
                  <MdOutlineTimer size={20} />
                </TableCell>
                <TableCell sx={{ width: "20%" }}>Estimasi Waktu</TableCell>
                <TableCell>: ± 5 Menit</TableCell>
              </TableRow>
              <TableRow sx={{ "& td": { border: 0 } }}>
                <TableCell sx={{ width: "30px" }} className="text-primary">
                  <FaGears size={20} />
                </TableCell>
                <TableCell sx={{ width: "20%" }}>Metode</TableCell>
                <TableCell>: Sistem Pakar Forward Chaining</TableCell>
              </TableRow>
            </Table>
          </CardContent>
        </Card>

        <Alert severity="info">
          Catatan: Data yang Anda masukkan hanya digunakan untuk proses
          rekomendasi dan tidak akan dibagikan kepada pihak lain.
        </Alert>

        <Button variant="contained" color="primary">
          Mulai Konsultasi
        </Button>
      </Stack>
    </Paper>
  );
}
