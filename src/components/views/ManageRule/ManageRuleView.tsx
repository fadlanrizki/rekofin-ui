"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  styled,
  tableCellClasses,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { FaEdit, FaPlus } from "react-icons/fa";
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
        showConfirm("Apakah anda yakin ingin menghapus aturan ?");
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Kelola Aturan</h1>

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
          </Grid>
          <Button
            startIcon={<FaPlus />}
            variant="contained"
            color="primary"
            onClick={handleAddRule}
          >
            Aturan
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
                <StyledTableCell>Nama Aturan</StyledTableCell>
                <StyledTableCell>Deskripsi</StyledTableCell>
                <StyledTableCell>Kategori Kesimpulan</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
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
              ) : Array.isArray(rules) && rules.length > 0 ? (
                rules.map((rule, index) => (
                  <StyledTableRow key={rule.id}>
                    <StyledTableCell>{index + 1}.</StyledTableCell>
                    <StyledTableCell>{rule.name}</StyledTableCell>
                    <StyledTableCell>{rule.description}</StyledTableCell>
                    <StyledTableCell>
                      <Stack direction={"row"} spacing={2}>
                        {rule.conclusions.map((conclusion: any) => (
                          <Chip
                            key={conclusion.id}
                            label={conclusion.category}
                            color="info"
                          />
                        ))}
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDateView(rule.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          onClick={() => handleActions(PAGE_ACTION.EDIT, rule)}
                        >
                          <FaEdit className="text-primary" />
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
