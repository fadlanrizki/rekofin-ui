"use client";

import Loading from "@/components/shared/Loading";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { useModal } from "@/hooks/useModal";
import { ConsultationService } from "@/service/consultationService";
import { TConsultationHistory } from "@/types/common";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { formatDateView } from "@/utils/date";
import { getErrorMessage } from "@/utils/message";
import {
  Box,
  Button,
  Grid,
  IconButton,
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
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RiEyeLine } from "react-icons/ri";

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

type TConsultationHistoryParams = {
  search: string;
  limit: number;
  page: number;
};

const defaultParams: TConsultationHistoryParams = {
  search: "",
  limit: 10,
  page: 1,
};

const csvHeaders = [
  "consultationId",
  "status",
  "startedAtFormatted",
  "endedAtFormatted",
  "durationMinutes",
  "conclusionCategories",
  "conclusionCodes",
  "conclusionDescriptions",
  "recommendationTitles",
  "recommendationContents",
  "totalConclusions",
  "totalRecommendations",
  "exportedAt",
];

const escapeCsvValue = (value: string | number) => {
  const normalized = String(value ?? "");
  return `"${normalized.replace(/"/g, '""')}"`;
};

const calculateDurationMinutes = (startedAt: string, endedAt: string) => {
  if (!startedAt || !endedAt) {
    return "-";
  }

  const startTimestamp = new Date(startedAt).getTime();
  const endTimestamp = new Date(endedAt).getTime();

  if (
    Number.isNaN(startTimestamp) ||
    Number.isNaN(endTimestamp) ||
    endTimestamp < startTimestamp
  ) {
    return "-";
  }

  return Math.floor((endTimestamp - startTimestamp) / (1000 * 60));
};

const mapHistoryToCsvRow = (
  history: TConsultationHistory,
  exportedAt: string,
): Array<string | number> => {
  const conclusions = Array.isArray(history?.conclusions)
    ? history.conclusions
    : [];

  const categories = conclusions
    .map((item) => item?.conclusion?.category)
    .filter(Boolean);

  const codes = conclusions
    .map((item) => item?.conclusion?.code)
    .filter(Boolean);

  const descriptions = conclusions
    .map((item) => item?.conclusion?.description)
    .filter(Boolean);

  const recommendations = conclusions.flatMap((item) =>
    Array.isArray(item?.conclusion?.recommendations)
      ? item.conclusion.recommendations
      : [],
  );

  const recommendationTitles = recommendations
    .map((recommendation) => recommendation.title)
    .filter(Boolean);

  const recommendationContents = recommendations
    .map((recommendation) => recommendation.content)
    .filter(Boolean);

  return [
    history.id,
    history.status || "-",
    formatDateView(history.startedAt),
    formatDateView(history.endedAt),
    calculateDurationMinutes(history.startedAt, history.endedAt),
    categories.join("; "),
    codes.join("; "),
    descriptions.join("; "),
    recommendationTitles.join("; "),
    recommendationContents.join("; "),
    conclusions.length,
    recommendations.length,
    exportedAt,
  ];
};

const buildCsvContent = (histories: TConsultationHistory[]) => {
  const exportedAt = formatDateView(new Date().toISOString());
  const rows = [
    csvHeaders,
    ...histories.map((history) => mapHistoryToCsvRow(history, exportedAt)),
  ];

  return rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
};

const downloadCsv = (csvContent: string) => {
  const now = new Date();
  const dateStamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const timeStamp = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  const blob = new Blob(["\uFEFF", csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `consultation-history-${dateStamp}-${timeStamp}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export default function HistoryView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [params, setParams] =
    useState<TConsultationHistoryParams>(defaultParams);
  const [total, setTotal] = useState(0);
  const { modal, closeModal, showFailed, showSuccess } = useModal();
  const [histories, setHistories] = useState<TConsultationHistory[] | null>(
    null,
  );
  const [tempSearch, setTempSearch] = useState("");

  const handleChangeSearch = (value: string) => {
    setTempSearch(value);
  };

  const onEnterSearch = (value: KeyboardEvent<HTMLDivElement>) => {
    if (value.key === "Enter") {
      setParams((prev) => ({
        ...prev,
        page: 1,
        search: tempSearch,
      }));
    }
  };

  const handleChangePage = (_event: unknown, page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleViewDetail = (historyId: number) => {
    router.push(ROUTE_PATHS.USER.HISTORY_DETAIL(historyId));
  };

  const handleExport = () => {
    if (!Array.isArray(histories) || histories.length === 0) {
      showFailed("Data history tidak tersedia untuk diexport.");
      return;
    }

    try {
      const csvContent = buildCsvContent(histories);
      if (!csvContent.trim()) {
        showFailed("Data export tidak valid.");
        return;
      }

      downloadCsv(csvContent);
      showSuccess("Export history berhasil.");
    } catch (error) {
      console.error("Failed to export consultation history", error);
      const message =
        getErrorMessage(error) || "Export history gagal diproses.";
      showFailed(message);
    }
  };

  const fetchHistories = async () => {
    setLoading(true);
    try {
      const response = await ConsultationService.getConsultationHistory(params);
      setHistories(response.data.consultations as TConsultationHistory[]);
      setTotal(response.data.total as number);
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleExport}
              >
                Export
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
                  <StyledTableCell align="center">Action</StyledTableCell>
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
                          .map((conclusion) => conclusion.conclusion.category)
                          .join(", ")}
                      </StyledTableCell>
                      <StyledTableCell>{history.status}</StyledTableCell>
                      <StyledTableCell>
                        {formatDateView(history.startedAt)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formatDateView(history.endedAt)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleViewDetail(history.id)}
                          aria-label="Lihat detail history"
                        >
                          <RiEyeLine />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
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
