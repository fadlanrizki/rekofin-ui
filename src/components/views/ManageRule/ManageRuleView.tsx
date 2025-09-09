"use client";

import { useState } from "react";
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
  Pagination,
  Grid,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";

const allRules = [
  {
    id: 1,
    category: "Emergency Fund",
    condition: "income < 3000000 AND savings < 500000",
    conclusion: "Needs Emergency Fund",
    createdBy: "admin1",
  },
  {
    id: 2,
    category: "Investment",
    condition: "savings > 5000000 AND emergency_fund >= 3000000",
    conclusion: "Ready to Invest",
    createdBy: "admin2",
  },
  {
    id: 3,
    category: "Savings",
    condition: "income >= 5000000 AND savings < 1000000",
    conclusion: "Should Increase Savings",
    createdBy: "admin1",
  },
];

export default function ManageRulesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredRules = allRules.filter((rule) => {
    const matchCategory =
      filterCategory === "All" || rule.category === filterCategory;
    const matchSearch = rule.condition
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAddRule = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RULE.ADD);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Manage Rules</h1>

      <Grid container size={12} justifyContent={"space-between"}>
        <Grid container size={6} spacing={2}>
          <TextField
            size="small"
            label="Search rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl size="small" className="min-w-[160px]">
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
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
            {filteredRules.map((rule, index) => (
              <TableRow key={rule.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{rule.category}</TableCell>
                <TableCell>{rule.condition}</TableCell>
                <TableCell>{rule.conclusion}</TableCell>
                <TableCell>{rule.createdBy}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton size="small">
                      <FaEdit className="text-primary" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <FaTrashCan />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination count={5} color="primary" />
      </div>
    </div>
  );
}
