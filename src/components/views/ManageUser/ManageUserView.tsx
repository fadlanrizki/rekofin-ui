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
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import ModalSuccess from "@/components/shared/Modal/ModalSuccess";
import { ParamsUser, TListUser } from "@/types/user";
import { UserService } from "@/service/userService";
import Loading from "@/components/shared/Loading";
// import { useDebounce } from "@/hooks/useDebounce";
import { IoSearch } from "react-icons/io5";
import ModalConfirmation from "@/components/shared/Modal/ModalConfirmation";
import ModalFailed from "@/components/shared/Modal/ModalFailed";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { formatDateView } from "@/utils/date";

const defaultParams: ParamsUser = {
  search: "",
  filter: {
    role: "all",
  },
  limit: 10,
  page: 1,
};

export default function ManageUserView() {
  const router = useRouter();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<TListUser[] | null>(null);
  const [params, setParams] = useState<ParamsUser>(defaultParams);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [totalUser, setTotalUser] = useState(0); // const debounceSearch = useDebounce(params.search, 1500);
  const [tempSearch, setTempSearch] = useState("");

  const onOpenModalConfirm = () => setModalConfirm(true);
  const onCloseModalConfirm = () => setModalConfirm(false);

  const onOpenModalSuccess = () => setModalSuccess(true);
  const onCloseModalSuccess = () => setModalSuccess(false);

  const onOpenModalFailed = () => setModalFailed(true);
  const onCloseModalFailed = () => setModalFailed(false);

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
    setMessage(`Apakah anda yakin ingin menghapus user "${user.fullName}" ? `);
    onOpenModalConfirm();
  };

  const apiDeleteUser = async () => {
    setLoading(true);
    try {
      const response = await UserService.deleteUser(selectedId);
      setMessage(response.message);
      onOpenModalSuccess();
    } catch (error: any) {
      setMessage(error.message);
      onOpenModalFailed();
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
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Grid
                    container
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Loading size="sm" />{" "}
                    <span className="text-slate-500">Loading data ...</span>
                  </Grid>
                </TableCell>
              </TableRow>
            ) : users ? (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{formatDateView(user.createdAt)}</TableCell>
                  <TableCell>
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
                        onClick={() => handleActions(PAGE_ACTION.DELETE, user)}
                      >
                        <FaTrashCan />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <p className="text-slate-500">Empty Data ...</p>
                </TableCell>
              </TableRow>
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
        />
      </div>

      <ModalSuccess
        open={modalSuccess}
        message={message}
        onClose={onCloseModalSuccess}
      />

      <ModalConfirmation
        open={modalConfirm}
        onClose={onCloseModalConfirm}
        message={message}
        title={"Konfirmasi Hapus"}
        onSubmit={apiDeleteUser}
      />

      <ModalFailed
        open={modalFailed}
        message={message}
        onClose={onCloseModalFailed}
      />
    </div>
  );
}
