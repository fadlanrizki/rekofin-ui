"use client";

import {
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  styled,
  tableCellClasses,
  Grid,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useModal } from "@/hooks/useModal";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import Loading from "@/components/shared/Loading";
import { IoSearch } from "react-icons/io5";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { formatDateView } from "@/utils/date";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { ConclusionService } from "@/service/conclusionService";

const defaultParams = {
  search: "",
  limit: 10,
  page: 1,
};

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

export default function ManageConclusionView() {
  const router = useRouter();
  const { modal, closeModal, showConfirm, showFailed, showSuccess } =
    useModal();

  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>(defaultParams);
  const [conclusions, setConclusions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState("");

  const [tempSearch, setTempSearch] = useState("");

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const response = await ConclusionService.getList(params);
      setConclusions(response.data);
      setTotal(response.total);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendation();
  }, [params]);

  const handleAdd = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_CONCLUSION.ADD);
  };

  const onEnterSearch = (value: any) => {
    if (value.key === "Enter") {
      setParams((prev: any) => ({
        ...prev,
        search: tempSearch,
      }));
    }
  };

  const handleChangeSearch = (value: string) => {
    setTempSearch(value);
  };

  const handleChangePage = (event: any, page: number) => {
    setParams((prev: any) => ({
      ...prev,
      page,
    }));
  };

  const handleActions = (action: string, rule: any) => {
    const { id } = rule;
    switch (action) {
      case "view":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_CONCLUSION.VIEW}/${id}`);
        break;
      case "edit":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_CONCLUSION.EDIT}/${id}`);
        break;
      case "delete":
        setSelectedId(id);
        showConfirm("Apakah anda yakin ingin menghapus data kesimpulan ?");
        break;
    }
  };

  const apiDeleteRecommendation = async () => {
    setLoading(true);

    try {
      const response = await ConclusionService.deleteData(selectedId);
      const message = getResponseMessage(response);

      await fetchRecommendation();
      showSuccess(message);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <h1 className="text-2xl font-semibold">Kelola Kesimpulan</h1>

      <Box
        className="rounded-2xl flex flex-col gap-4 p-4 shadow-xs"
        sx={{
          bgcolor: "background.paper",
          border: 2,
          borderColor: "divider",
        }}
      >
        <Grid container size={12} justifyContent={"space-between"}>
          <Grid container size={6} spacing={2}>
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
          </Grid>
          <Button
            startIcon={<FaPlus />}
            variant="contained"
            color="primary"
            onClick={handleAdd}
            className="max-h-[40px]"
          >
            Kesimpulan
          </Button>
        </Grid>

        {/* Table */}
        <TableContainer
          component={Paper}
          className="rounded-lg shadow-md"
          sx={{ height: "600px" }}
        >
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow className="bg-gray-100">
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Kode Kesimpulan</StyledTableCell>
                <StyledTableCell>Kategori</StyledTableCell>
                <StyledTableCell>Deskripsi</StyledTableCell>
                <StyledTableCell>Dibuat pada</StyledTableCell>
                <StyledTableCell>Aksi</StyledTableCell>
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
              ) : Array.isArray(conclusions) && conclusions.length > 0 ? (
                conclusions.map((con, index) => (
                  <StyledTableRow key={con.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{con.code}</StyledTableCell>
                    <StyledTableCell>{con.category}</StyledTableCell>
                    <StyledTableCell>{con.description}</StyledTableCell>
                    <StyledTableCell>
                      {formatDateView(con.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleActions(PAGE_ACTION.EDIT, con)}
                        >
                          <FaEdit className="text-primary" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleActions(PAGE_ACTION.DELETE, con)}
                        >
                          <FaTrashCan />
                        </IconButton>
                      </div>
                    </StyledTableCell>
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

        {/* Pagination */}
        <div className="flex justify-end">
          <TablePagination
            total={total}
            limit={params.limit}
            onChange={handleChangePage}
            list={conclusions}
          />
        </div>
      </Box>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={() => apiDeleteRecommendation()}
      />
    </div>
  );
}
