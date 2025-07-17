"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Popover,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TablePagination,
  TableContainer,
} from "@mui/material";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const rows = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  date: "2025-07-01",
  category: "Emergency Fund",
  source: "Book",
}));

export default function HistoryView() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (e: React.MouseEvent | null, page: number) => {
    setPage(page);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const open = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="p-6">
      {/* Header */}
      <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Typography variant="h5" fontWeight="bold">
          Riwayat Rekomendasi
        </Typography>

        <Box className="flex gap-4">
          <Button variant="outlined" onClick={handleFilterClick}>
            Filter
          </Button>
          <Button variant="contained" color="primary">
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Floating Filter */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box className="p-4 w-72 flex flex-col gap-4">
          {/* <DatePicker
            label="Pilih Tanggal"
            value={selectedDate}
            onChange={setSelectedDate}
            slotProps={{ textField: { fullWidth: true, size: 'small' } }}
          /> */}

          <FormControl fullWidth size="small">
            <InputLabel id="category-label">Kategori</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label="Kategori"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Emergency Fund">Emergency Fund</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Investment">Investment</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Popover>

      {/* Tabel */}
      <Paper elevation={3}>
        <Box p={2}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.source}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined">
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </Box>
      </Paper>

    </Box>
  );
}
