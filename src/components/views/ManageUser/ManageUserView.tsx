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
  Pagination,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import AddEditUserView from "./AddEditUserView";
import ModalCustom from "@/components/shared/Modal/ModalCustom";
import ModalSuccess from "@/components/shared/Modal/ModalSuccess";
import { ParamsUser, TListUser } from "@/types/user";
import { getUsers } from "@/service/userService";
import Loading from "@/components/shared/Loading";
// import { useDebounce } from "@/hooks/useDebounce";
import { IoSearch } from "react-icons/io5";

const defaultParams: ParamsUser = {
  search: "",
  filter: {
    role: "all",
  },
  limit: 10,
  page: 1,
};

export default function ManageUserView() {
  const [modalUser, setModalUser] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<TListUser[] | null>(null);
  const [params, setParams] = useState<ParamsUser>(defaultParams);
  const [loading, setLoading] = useState(true);

  // const debounceSearch = useDebounce(params.search, 1500);

  const onOpenModalUser = () => {
    setModalUser(true);
  };
  const onCloseModalUser = () => {
    setModalUser(false);
  };

  const handleSuccess = (message: string) => {
    setModalSuccess(true);
    setMessage(message);
    onCloseModalUser();
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(params);

      setUsers(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [params.filter.role]);

  const handleChangeSearch = (value: string) => {
    setParams((prev) => ({
      ...prev,
      search: value,
    }));
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
      fetchUsers();
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
          <Button variant="contained" color="primary" onClick={onOpenModalUser}>
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
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton size="small" color="primary">
                        <FaEdit className="text-primary" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <FaTrashCan />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <p className="text-slate-500">Empty Data ...</p>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination count={3} color="primary" />
      </div>

      <ModalCustom title="User" open={modalUser} onClose={onCloseModalUser}>
        <AddEditUserView
          onClose={onCloseModalUser}
          onSuccess={(message: string) => handleSuccess(message)}
        />
      </ModalCustom>

      <ModalSuccess
        open={modalSuccess}
        message={message}
        onClose={() => setModalSuccess(false)}
      />
    </div>
  );
}
