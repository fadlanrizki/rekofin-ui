"use client";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  InputLabel,
  FormControl,
  Grid,
  styled,
  tableCellClasses,
  Box,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { ParamsUser, TListUser } from "@/types/user";
import { UserService } from "@/service/userService";
import Loading from "@/components/shared/Loading";
import { IoSearch } from "react-icons/io5";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { formatDateView } from "@/utils/date";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { useModal } from "@/hooks/useModal";
import { getErrorMessage, getResponseMessage } from "@/utils/message";

const defaultParams: ParamsUser = {
  search: "",
  filter: {
    role: "all",
  },
  limit: 10,
  page: 1,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#7f8c8d",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
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
  const [users, setUsers] = useState<TListUser[] | null>(null);
  const [params, setParams] = useState<ParamsUser>(defaultParams);
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

  const handleChangeRole = (value: string) => {
    setParams((prev: any) => {
      return {
        ...prev,
        filter: {
          ...prev.filter,
          role: value,
        },
      };
    });
  };

  const onEnterSearch = (value: any) => {
    if (value.key === "Enter") {
      setParams((prev) => ({
        ...prev,
        search: tempSearch,
      }));
    }
  };

  const handleDeleteUser = (user: TListUser) => {
    setSelectedId(user.id.toString());
    showConfirm(`Apakah anda yakin ingin menghapus user "${user.fullName}" ? `);
  };

  const apiDeleteUser = async () => {
    let message = "";
    setLoading(true);
    try {
      const response = await UserService.deleteUser(selectedId);
      message = getResponseMessage(response);
      showSuccess(message);
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

  const handleActions = (action: string, user: any) => {
    const { id } = user;
    switch (action) {
      case "view":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_USER.VIEW}/${id}`);
        break;
      case "edit":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_USER.EDIT}/${id}`);
        break;
      case "delete":
        handleDeleteUser(user);
        break;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Users</h1>

      <Box className="bg-white border-2 border-[#eaeaea] rounded-2xl flex flex-col gap-4 p-4 shadow-xs">
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
              label="Search..."
              value={params.search}
              onKeyDown={onEnterSearch}
              onChange={(e) => handleChangeSearch(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: <IoSearch />,
                },
              }}
            />

            <FormControl size="small" className="min-w-[160px]">
              <InputLabel>Role</InputLabel>
              <Select
                value={params.filter.role}
                label="Role"
                onChange={(e) => handleChangeRole(e.target.value)}
                className="w-[200px]"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent={"flex-end"}>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add User
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
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
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
                    <StyledTableCell>{user.fullName}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.role}</StyledTableCell>
                    <StyledTableCell>
                      {formatDateView(user.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          onClick={() => handleActions(PAGE_ACTION.VIEW, user)}
                        >
                          <FaInfoCircle className="text-primary" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleActions(PAGE_ACTION.EDIT, user)}
                        >
                          <FaEdit className="text-accent" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            handleActions(PAGE_ACTION.DELETE, user)
                          }
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
            total={totalUser}
            limit={params.limit}
            onChange={handleChangePage}
            list={users}
          />
        </div>
      </Box>

      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={apiDeleteUser}
      />
    </div>
  );
}
