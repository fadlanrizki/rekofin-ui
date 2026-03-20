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
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { RiQuestionnaireFill } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { FaGears } from "react-icons/fa6";
import { ConsultationService } from "@/service/consultationService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";

export default function ConsultationView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startConsultation = async () => {
    try {
      setLoading(true);
      const response: any = await ConsultationService.startConsultation();
      localStorage.setItem("consultationId", response.data.id);
      router.push(ROUTE_PATHS.USER.CONSULTATION.QUESTION);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getConsultationStatus = async () => {
    try {
      setLoading(true);
      const response: any = await ConsultationService.getConsultationStatus();
      if (response.data.id) {
        localStorage.setItem("consultationId", response.data.id);
        router.push(ROUTE_PATHS.USER.CONSULTATION.QUESTION);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsultationStatus();
  }, []);

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
              <TableBody>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Alert severity="info">
          Catatan: Data yang Anda masukkan hanya digunakan untuk proses
          rekomendasi dan tidak akan dibagikan kepada pihak lain.
        </Alert>

        <Button
          variant="contained"
          color="primary"
          onClick={startConsultation}
          disabled={loading}
          loading={loading}
        >
          Mulai Konsultasi
        </Button>
      </Stack>
    </Paper>
  );
}
