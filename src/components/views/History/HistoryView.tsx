"use client";

import Loading from "@/components/shared/Loading";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { useModal } from "@/hooks/useModal";
import { ConsultationService } from "@/service/consultationService";
import { formatDateView } from "@/utils/date";
import { getErrorMessage } from "@/utils/message";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const defaultParams = {
  search: "",
  limit: 10,
  page: 1,
};

export default function HistoryView() {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>(defaultParams);
  const [total, setTotal] = useState(0);
  const { modal, closeModal, showFailed } = useModal();
  const [histories, setHistories] = useState<any[] | null>(null);
  const [tempSearch, setTempSearch] = useState("");

  const handleChangeSearch = (value: string) => {
    setTempSearch(value);
  };
  const onEnterSearch = (vaelue: any) => {
    if (vaelue.key === "Enter") {
      setParams((prev: any) => ({
        ...prev,
        search: tempSearch,
      }));
    }
  };

  const handleChangePage = (event: any, page: number) => {
    setParams((prev: any) => ({
      ...prev,
      page,
    }));
  };

  const fetchHistories = async () => {
    setLoading(true);
    try {
      const response = await ConsultationService.getConsultationHistory(params);
      setHistories(response.data);
      setTotal(response.total);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, [params]);

  return (
    <Box className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Riwayat Konsultasi</h1>

      {/* Tabel */}
      <Paper elevation={3}>
        <Stack spacing={2} direction={"column"} p={2}>
          <Box className="flex md:flex-row justify-between gap-4 w-full">
            <TextField
              size="small"
              label="Cari..."
              value={tempSearch}
              onKeyDown={onEnterSearch}
              onChange={(e) => handleChangeSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: <IoSearch />,
                },
              }}
            />
            <Box className="flex gap-4">
              <Button variant="contained" color="primary">
                Export PDF
              </Button>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            className="rounded-lg shadow-md"
            sx={{ height: "600px" }}
          >
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>No</StyledTableCell>
                  <StyledTableCell>Rekomendasi</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Tanggal Konsultasi</StyledTableCell>
                  <StyledTableCell>Tanggal Selesai</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
                      <Grid
                        container
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Loading size="sm" />{" "}
                        <span className="text-slate-500">Loading data ...</span>
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : Array.isArray(histories) && histories.length > 0 ? (
                  histories.map((history, index) => (
                    <StyledTableRow key={history.id}>
                      <StyledTableCell>{index + 1}.</StyledTableCell>
                      <StyledTableCell>
                        {history.conclusions
                          .map(
                            (conclusion: any) => conclusion.conclusion.category,
                          )
                          .join(", ")}
                      </StyledTableCell>
                      <StyledTableCell>{history.status}</StyledTableCell>
                      <StyledTableCell>
                        {formatDateView(history.startedAt)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDateView(history.endedAt)}
                      </StyledTableCell>
                      {/* <StyledTableCell>
                        <Stack direction={"row"} spacing={2}>
                          {history.conclusions.map((conclusion: any) => (
                            <Chip
                              key={conclusion.id}
                              label={conclusion.category}
                              color="info"
                            />
                          ))}
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDateView(history.createdAt)}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={7} align="center">
                      <p className="text-slate-500">Empty Data ...</p>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex justify-end">
            <TablePagination
              total={total}
              limit={params.limit}
              onChange={handleChangePage}
              list={histories}
            />
          </div>
        </Stack>
      </Paper>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
      />
    </Box>
  );
}
