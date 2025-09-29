"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import ModalSuccess from "@/components/shared/Modal/ModalSuccess";
import ModalConfirmation from "@/components/shared/Modal/ModalConfirmation";
import ModalFailed from "@/components/shared/Modal/ModalFailed";
import Loading from "@/components/shared/Loading";
import { RuleService } from "@/service/ruleService";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { IoSearch } from "react-icons/io5";

const defaultParams = {
  search: "",
  filter: {
    categoryResult: "all",
  },
  limit: 10,
  page: 1,
};


export default function ManageRulesPage() {
  const router = useRouter();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [rules, setRules] = useState<any[] | null>(null);
  const [params, setParams] = useState<any>(defaultParams);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [total, setTotal] = useState(0);
  const [tempSearch, setTempSearch] = useState("");

  const onOpenModalConfirm = () => setModalConfirm(true);
  const onCloseModalConfirm = () => setModalConfirm(false);

  const onOpenModalSuccess = () => setModalSuccess(true);
  const onCloseModalSuccess = () => setModalSuccess(false);

  const onOpenModalFailed = () => setModalFailed(true);
  const onCloseModalFailed = () => setModalFailed(false);

  const handleAddRule = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.ADD);
  };

  const fetchRules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await RuleService.getList(params);

      setRules(response.data);
      setTotal(response.total);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const handleActions = (action: string, rule: any) => {
    const { id } = rule;
    switch (action) {
      case "view":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_RULE.VIEW}/${id}`);
        break;
      case "edit":
        router.push(`${ROUTE_PATHS.ADMIN.MANAGE_RULE.EDIT}/${id}`);
        break;
      case "delete":
        handleDeleteRule(rule);
        break;
    }
  };

  const handleDeleteRule = (id: number) => {
    setSelectedId(id.toString());
    setMessage(`Apakah anda yakin ingin menghapus rule ? `);
    onOpenModalConfirm();
  };

  const apiDeleteRule = async () => {
    setLoading(true);
    try {
      const response = await RuleService.deleteData(selectedId);
      setMessage(response.message);
      onOpenModalSuccess();
    } catch (error: any) {
      setMessage(error.message);
      onOpenModalFailed();
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSearch = (value: string) => {
    setTempSearch(value);
  };

  const onEnterSearch = (value: any) => {
    if (value.key === "Enter") {
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

  const handleChangeCategory = (value: string) => {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Manage Rules</h1>

      <Grid container size={12} justifyContent={"space-between"}>
        <Grid container size={6} spacing={2}>
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
            <InputLabel>Category</InputLabel>
            <Select
              value={params.filter.categoryResult}
              label="Category"
              onChange={(e) => handleChangeCategory(e.target.value)}
              className="w-[200px]"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Emergency Fund">Emergency Fund</MenuItem>
              <MenuItem value="Investment">Investment</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleAddRule}>
          Add Rule
        </Button>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Conclusion</TableCell>
              <TableCell>Created By</TableCell>
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
            ) : rules ? (
              rules.map((rule, index) => (
                <TableRow key={rule.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{rule.category}</TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>{rule.conclusion}</TableCell>
                  <TableCell>{rule.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton
                        size="small"
                        onClick={() => handleActions(PAGE_ACTION.VIEW, rule)}
                      >
                        <FaInfoCircle className="text-primary" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleActions(PAGE_ACTION.EDIT, rule)}
                      >
                        <FaEdit className="text-accent" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleActions(PAGE_ACTION.DELETE, rule)}
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

      <div className="flex justify-end">
        <TablePagination
          total={total}
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
        onSubmit={apiDeleteRule}
      />

      <ModalFailed
        open={modalFailed}
        message={message}
        onClose={onCloseModalFailed}
      />
    </div>
  );
}
