'use client'

import { useState } from 'react'
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
} from '@mui/material'
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const allRules = [
  {
    id: 1,
    category: 'Emergency Fund',
    condition: 'income < 3000000 AND savings < 500000',
    conclusion: 'Needs Emergency Fund',
    createdBy: 'admin1',
  },
  {
    id: 2,
    category: 'Investment',
    condition: 'savings > 5000000 AND emergency_fund >= 3000000',
    conclusion: 'Ready to Invest',
    createdBy: 'admin2',
  },
  {
    id: 3,
    category: 'Savings',
    condition: 'income >= 5000000 AND savings < 1000000',
    conclusion: 'Should Increase Savings',
    createdBy: 'admin1',
  },
]

export default function ManageRulesPage() {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredRules = allRules.filter((rule) => {
    const matchCategory =
      filterCategory === 'All' || rule.category === filterCategory
    const matchSearch = rule.condition
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Manage Rules</h1>

        <div className="flex gap-2 flex-wrap">
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
              className='w-[200px]'
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Emergency Fund">Emergency Fund</MenuItem>
              <MenuItem value="Investment">Investment</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary">
            Add Rule
          </Button>
        </div>
      </div>

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
        <Pagination count={5} color="primary" />
      </div>
    </div>
  )
}
