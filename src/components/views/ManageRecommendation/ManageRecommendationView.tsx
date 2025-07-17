'use client'

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
} from '@mui/material'
import { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const dummyRecommendations = [
  {
    id: 1,
    title: 'Mulai Menabung 20% Gaji',
    category: 'Tabungan',
    source: 'Buku',
  },
  {
    id: 2,
    title: 'Dana Darurat Ideal 6x Pengeluaran',
    category: 'Dana Darurat',
    source: 'Edukasi',
  },
]

export default function ManageRecommendationView() {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterSource, setFilterSource] = useState('All')

  const filteredData = dummyRecommendations.filter((rec) => {
    const matchCategory = filterCategory === 'All' || rec.category === filterCategory
    const matchSource = filterSource === 'All' || rec.source === filterSource
    const matchSearch = rec.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSource && matchSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4">
        <h1 className="text-2xl font-semibold">Manage Recommendations</h1>

        <div className='w-full flex justify-between'>
          <div className='flex gap-3'>
<TextField
            size="small"
            label="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
            <FormControl size="small" className="min-w-[160px]">
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
              className='w-[200px]'
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Dana Darurat">Dana Darurat</MenuItem>
              <MenuItem value="Tabungan">Tabungan</MenuItem>
              <MenuItem value="Investasi">Investasi</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="min-w-[160px]">
            <InputLabel>Source</InputLabel>
            <Select
              value={filterSource}
              label="Source"
              onChange={(e) => setFilterSource(e.target.value)}
              className='w-[200px]'
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Buku">Buku</MenuItem>
              <MenuItem value="Edukasi">Edukasi</MenuItem>
              <MenuItem value="Influencer">Influencer</MenuItem>
            </Select>
          </FormControl>
          </div>

          <Button variant="contained" color="primary">
            Add Recommendation
          </Button>
          </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((rec, index) => (
              <TableRow key={rec.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{rec.title}</TableCell>
                <TableCell>{rec.category}</TableCell>
                <TableCell>{rec.source}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton size="small" color="primary">
                      <FaEdit className='text-primary' />
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
        <Pagination count={2} color="primary" />
      </div>
    </div>
  )
}
