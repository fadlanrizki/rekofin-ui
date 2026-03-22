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
  Grid,
  styled,
  tableCellClasses,
  Box,
  Chip,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { UserService } from "@/service/userService";
import Loading from "@/components/shared/Loading";
import { IoSearch } from "react-icons/io5";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { formatDateView } from "@/utils/date";
import SweetAlertNotification from "@/components/shared/Modal/SweetAlertNotification";
import { useModal } from "@/hooks/useModal";
import { getErrorMessage, getResponseMessage } from "@/utils/message";

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

export default function ManageUserView() {
  const router = useRouter();
  const { modal, showSuccess, showFailed, showConfirm, closeModal } =
    useModal();
  const [users, setUsers] = useState<any[] | null>(null);
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [totalUser, setTotalUser] = useState(0); // const debounceSearch = useDebounce(params.search, 1500);
  const [tempSearch, setTempSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers(params);

      setUsers(response.data);
      setTotalUser(response.total);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangeSearch = (value: string) => {
    setTempSearch(value);
  };

  const onEnterSearch = (value: any) => {
    if (value.key === "Enter") {
      setParams((prev) => ({
        ...prev,
        search: tempSearch,
      }));
    }
  };

  const handleDeleteUser = (id: string) => {
    setSelectedId(id);
    showConfirm(`Apakah anda yakin ingin menghapus user ? `);
  };

  const apiDeleteUser = async () => {
    let message = "";
    setLoading(true);
    try {
      const response = await UserService.deleteUser(selectedId);
      message = getResponseMessage(response);
      showSuccess(message);
      await fetchUsers();
    } catch (error: any) {
      message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_USER.ADD);
  };

  const handleChangePage = (event: any, page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Kelola Pengguna</h1>

      <Box
        className="rounded-2xl flex flex-col gap-4 p-4 shadow-xs"
        sx={{
          bgcolor: "background.paper",
          border: 2,
          borderColor: "divider",
        }}
      >
        <Grid
          container
          size={12}
          justifyContent={"space-between"}
          spacing={2}
          wrap="nowrap"
        >
          <Grid container size={6} spacing={2} wrap="nowrap">
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
          <Grid container justifyContent={"flex-end"}>
            <Button
              startIcon={<FaUserPlus />}
              variant="contained"
              color="primary"
              onClick={handleAddUser}
            >
              Pengguna
            </Button>
          </Grid>
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
                <StyledTableCell>Nama Pengguna</StyledTableCell>
                <StyledTableCell>Nama Lengkap</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Dibuat Pada</StyledTableCell>
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
              ) : users ? (
                users.map((user, index) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{user.username}</StyledTableCell>
                    <StyledTableCell>{user.fullname}</StyledTableCell>
                    <StyledTableCell>
                      {user.role === "ADMIN" ? (
                        <Chip label={user.role} color="primary" />
                      ) : user.role === "USER" ? (
                        <Chip label={user.role} color="secondary" />
                      ) : (
                        <Chip label={"-"} color="error" />
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDateView(user.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <FaTrashCan />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} align="center">
                    <p className="text-slate-500">Data tidak ditemukan ...</p>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex justify-end">
          <TablePagination
            total={totalUser}
            limit={params.limit}
            onChange={handleChangePage}
            list={users}
          />
        </div>
      </Box>

      <SweetAlertNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={apiDeleteUser}
      />
    </div>
  );
}
