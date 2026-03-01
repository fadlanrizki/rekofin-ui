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
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import Loading from "@/components/shared/Loading";
import { IoSearch } from "react-icons/io5";
import { SourceService } from "@/service/sourceService";
import { getErrorMessage, getResponseMessage } from "@/utils/message";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { formatDateView } from "@/utils/date";
import { PAGE_ACTION } from "@/utils/constants/page-action";

const defaultParams = {
  search: "",
  limit: 10,
  page: 1,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#7f8c8d",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f2f6fa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ManageSourceListView() {
  const router = useRouter();
  const { modal, closeModal, showConfirm, showFailed, showSuccess } =
    useModal();

  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>(defaultParams);
  const [sources, setSources] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState("");

  const [tempSearch, setTempSearch] = useState("");

  const fetchSource = async () => {
    setLoading(true);
    try {
      const response = await SourceService.getList(params);
      setSources(response.data);
      setTotal(response.total);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSource();
  }, [params]);

  const handleAdd = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_SOURCE.ADD);
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

  const handleActions = (action: string, item: any) => {
    const { id } = item;
    switch (action) {
      case "view":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_SOURCE.VIEW}/${id}`);
        break;
      case "edit":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_SOURCE.EDIT}/${id}`);
        break;
      case "delete":
        setSelectedId(id);
        showConfirm("Apakah anda yakin ingin menghapus sumber ini?");
        break;
    }
  };

  const apiDeleteSource = async () => {
    setLoading(true);

    try {
      const response = await SourceService.deleteData(selectedId);
      const message = getResponseMessage(response);

      await fetchSource();
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

      <h1 className="text-2xl font-semibold">Kelola Sumber</h1>
      <Box className="bg-white border-2 border-[#eaeaea] rounded-2xl flex flex-col gap-4 p-4 shadow-xs">
        <Grid container size={12} justifyContent={"space-between"}>
          <Grid container size={6} spacing={2}>
            <TextField
              size="small"
              label="Cari Sumber..."
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
            Sumber
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
              <StyledTableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Nama Sumber</StyledTableCell>
                <StyledTableCell>Deskripsi</StyledTableCell>
                <StyledTableCell>Dibuat pada</StyledTableCell>
                <StyledTableCell>Aksi</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
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
              ) : Array.isArray(sources) && sources.length > 0 ? (
                sources.map((src, index) => (
                  <StyledTableRow key={src.id}>
                    <StyledTableCell>{index + 1}.</StyledTableCell>
                    <StyledTableCell>{src.title}</StyledTableCell>
                    <StyledTableCell>{src.description || "-"}</StyledTableCell>
                    <StyledTableCell>
                      {formatDateView(src.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleActions(PAGE_ACTION.EDIT, src)}
                        >
                          <FaEdit className="text-primary" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleActions(PAGE_ACTION.DELETE, src)}
                        >
                          <FaTrashCan />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
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
            list={sources}
          />
        </div>
      </Box>

      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={() => apiDeleteSource()}
      />
    </div>
  );
}
