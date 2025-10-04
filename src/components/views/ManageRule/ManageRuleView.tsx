"use client";

import { useEffect, useState } from "react";
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
  Chip,
  styled,
  tableCellClasses,
  Box,
} from "@mui/material";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import Loading from "@/components/shared/Loading";
import { RuleService } from "@/service/ruleService";
import TablePagination from "@/components/shared/Pagination/TablePagination";
import { IoSearch } from "react-icons/io5";
import { formatDateView } from "@/utils/date";
import { useModal } from "@/hooks/useModal";
import ModalNotification from "@/components/shared/Modal/ModalNotification";
import { getErrorMessage, getResponseMessage } from "@/utils/message";

const defaultParams = {
  search: "",
  filter: {
    categoryResult: "all",
  },
  limit: 10,
  page: 1,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#003366",
    fontWeight: "bold",
    color: theme.palette.common.white,
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

export default function ManageRulesPage() {
  const router = useRouter();
  const [rules, setRules] = useState<any[] | null>(null);
  const [params, setParams] = useState<any>(defaultParams);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [total, setTotal] = useState(0);
  const [tempSearch, setTempSearch] = useState("");
  const { modal, closeModal, showConfirm, showFailed, showSuccess } =
    useModal();

  const handleAddRule = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.ADD);
  };

  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await RuleService.getList(params);
      setRules(response.data);
      setTotal(response.total);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, [params]);

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
        setSelectedId(id);
        showConfirm("Apakah anda yakin ingin menghapus rule ?");
        break;
    }
  };

  const apiDeleteRule = async () => {
    setLoading(true);
    try {
      const response = await RuleService.deleteData(selectedId);
      const message = getResponseMessage(response);

      // re-fetch rules
      await fetchRules();
      showSuccess(message);
    } catch (error) {
      const message = getErrorMessage(error);
      showFailed(message);
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
          categoryResult: value,
        },
      };
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Manage Rules</h1>

      <Box className="bg-white border-2 border-[#eaeaea] rounded-2xl flex flex-col gap-4 p-4 shadow-xs">
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

            <FormControl size="small" className="min-w-[160px]">
              <InputLabel>Kategori</InputLabel>
              <Select
                value={params.filter.categoryResult}
                label="Category"
                onChange={(e) => handleChangeCategory(e.target.value)}
                className="w-[200px]"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="dana_darurat">Dana Darurat</MenuItem>
                <MenuItem value="menabung">Menabung</MenuItem>
                <MenuItem value="investasi">Investasi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleAddRule}>
            Add Rule
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
                <StyledTableCell>Nama</StyledTableCell>
                <StyledTableCell>Deskripsi</StyledTableCell>
                <StyledTableCell>Kategori</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
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
              ) : Array.isArray(rules) && rules.length > 0 ? (
                rules.map((rule, index) => (
                  <StyledTableRow key={rule.id}>
                    <StyledTableCell>{index + 1}.</StyledTableCell>
                    <StyledTableCell>{rule.name}</StyledTableCell>
                    <StyledTableCell>{rule.description}</StyledTableCell>
                    <StyledTableCell>{rule.categoryResult}</StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        label={rule.active ? "Active" : "Inactive"}
                        color={rule.active ? "success" : "error"}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDateView(rule.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>
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
                          onClick={() =>
                            handleActions(PAGE_ACTION.DELETE, rule)
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
            list={rules}
          />
        </div>
      </Box>

      <ModalNotification
        open={modal.open}
        message={modal.message}
        onClose={closeModal}
        type={modal.type}
        onConfirm={apiDeleteRule}
      />
    </div>
  );
}
